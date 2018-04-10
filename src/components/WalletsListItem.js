/* @flow */
import * as React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import colors from 'utils/colors'
import MainWalletModel from 'models/wallet/MainWalletModel'
import MultisigWalletModel from 'models/wallet/MultisigWalletModel'
import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_TOKENS } from 'redux/tokens/actions'

import WalletImage from './WalletImage'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

type TMainWalletModel = typeof MainWalletModel
type TMultisigWalletModel = typeof MultisigWalletModel

const Transactions = ({ transactions }) => !transactions ? null : (
  !transactions[1] ? (
    <Image
      source={require('../images/indicator-receiving-25.png')}
    />
  ) : (
    <View style={styles.transactionsNumberContainer}>
      <Text style={styles.transactionsNumber}>
        {transactions.length}
      </Text>
    </View>
  )
)

const TokensList = ({tokens}) => {
  if (!tokens || !Object.keys(tokens).length) {
    return null
  }

  let tokensStrings = Object.keys(tokens).sort().reduce( (accumulator, tokenSymbol) => {
    accumulator.push([tokenSymbol, tokens[tokenSymbol].toFixed(2)].join(': '))
    return accumulator
  }, [])

  if (tokensStrings && tokensStrings.length > 2) {
    tokensStrings = [
      tokensStrings[0],
      ['+', tokensStrings.length - 1, 'more'].join(' '),
    ]
  }
  tokensStrings = tokensStrings && tokensStrings.join(', ')

  return (
    <Text style={styles.tokens}>
      {tokensStrings}
    </Text>
  )
}

const Exchange = ({ exchange }) => !exchange ? null : (
  <Text style={styles.exchange}>
    {exchange.currency} {exchange.amount}
  </Text>
)

type WalletsListItemProps = {
  wallet: TMainWalletModel | TMultisigWalletModel,
  index: number,
  address: string,
  selectWallet(): void,
  navigator: any,
  selectedCurrency: string,
  prices: any,
  sectionName: string,
}

const mapStateToProps = (state) => {
  const {
    prices,
    selectedCurrency,
  } = state.get(DUCK_MARKET)
  const tokens = state.get(DUCK_TOKENS)

  return {
    prices,
    selectedCurrency,
    tokens,
  }
}

@connect(mapStateToProps, null)
export default class WalletsListItem extends React.Component<WalletsListItemProps> {

  handlePress = (): void => {

    const {
      navigator,
      wallet,
      address,
    } = this.props
  
    // this.props.selectWallet(
    //   wallet.isMultisig(),
    //   wallet.address()
    // )
    navigator.push({
      screen: 'Wallet',
      passProps: {
        wallet: wallet,
        address: address,
      },
    })
  }

  calculateWalletBalance = () => {
    let res = {}
    let usd = 0
    const prices = this.props.prices

    const filterBalancesByBlockchainName = (balanceItem) => {
      const bSymbol = balanceItem.symbol()
      const bToken = this.props.tokens.item(bSymbol)
      return bToken.blockchain() === this.props.sectionName
    }

    const filteredWalletBalancesItems = this.props.wallet.balances().items().filter(filterBalancesByBlockchainName)

    const convertAmountToNumber = (symbol, amount) =>
      this.props.tokens
        .item(symbol)
        .removeDecimals(amount)
        .toNumber()

    // TODO: this is only for main wallets
    if (!this.props.wallet.isMultisig() && this.props.prices) {
      filteredWalletBalancesItems
        .map( (balance) => {
          const bAmount = balance.amount()
          const bSymbol = balance.symbol()
          const tAmount = convertAmountToNumber(bSymbol, bAmount)
    
          res[bSymbol] = tAmount
          const tokenPrice = prices[ bSymbol ] && prices[ bSymbol ][ this.props.selectedCurrency ] || null
          if (tokenPrice && tAmount > 0) {
            usd += (tAmount * tokenPrice)
          }
        })
    }

    return {
      tokens: res,
      balanceUSD: usd.toFixed(2),
    }
  }

  render () {
    const {
      wallet,
      address,
    } = this.props

    const { tokens, balanceUSD } = this.calculateWalletBalance()

    const walletTitle = `My ${this.props.sectionName} Wallet`

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handlePress}
      >
        {
          wallet.isMultisig()
            ? <View><Text>TODO: draw multisig later</Text></View>
            : (
              <View>
                <View style={styles.transactions}>
                  <Transactions transactions={wallet.transactions} />
                </View>
                <View style={styles.content}>
                  <WalletImage
                    image={wallet.image}
                    walletMode={wallet.mode}
                    style={styles.image}
                  />
                  <View style={styles.contentColumn}>
                    <Text style={styles.title}>
                      {
                        walletTitle
                      }
                    </Text>
                    <Text style={styles.address}>
                      {address}
                    </Text>
                    <Text style={styles.balance}>
                      {this.props.selectedCurrency} {balanceUSD}
                    </Text>
                    <TokensList tokens={tokens} />
                    {false &&
                      <View>
                        <TokensList tokens={wallet.tokens} />
                        <Exchange exchange={wallet.exchange} />
                      </View>
                    }
                  </View>
                </View>
              </View>
            )
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 4,
    paddingBottom: 40,
  },
  transactions: {
    flexDirection: 'row',
    margin: 4,
    minHeight: 20,
    justifyContent: 'flex-end',
  },
  transactionsNumberContainer: {
    height: 20,
    minWidth: 20,
    backgroundColor: colors.red,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    marginRight: 16,
    marginLeft: 8,
  },
  transactionsNumber: {
    color: colors.background,
    fontWeight: '900',
  },
  content: {
    flexDirection: 'row',
  },
  contentColumn: {
    flex: 1,
  },
  title: {
    marginTop: 8,
    fontWeight: '700',
  },
  address: {
    marginTop: 4,
    fontWeight: '200',
    fontSize: 12,
  },
  balance: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 24,
  },
  tokens: {
    color: colors.foregroundLighter,
    fontWeight: '200',
    marginTop: 4,
  },
  exchange: {
    color: colors.foregroundLighter,
    fontWeight: '200',
    marginTop: 4,
  },
})
