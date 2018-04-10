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

const TokensList = ({ tokens }) => {
  if (!tokens || !tokens.length) {
    return null
  }

  const tokensNames = Object.keys(tokens)
  const tLength = tokensNames.length
  const firstTokenId = tokensNames[0]
  let tokensText = [firstTokenId, tokens[firstTokenId].toFixed(2)].join(' ')

  if (tLength === 2) {
    const secondTokenText = [tokensNames[1].id, tokensNames[1].amount.toFixed(2)].join(' ')
    tokensText = [tokensText, secondTokenText].join(', ')
  }

  if (tLength > 2) {
    const moreTokenText = ['+', tLength - 1, 'more'].join(' ')
    tokensText = [tokensText, moreTokenText].join(', ')
  }

  return (
    <Text style={styles.tokens}>
      {tokensText}
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

type WalletsListItemState = {
  balance: number,
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
export default class WalletsListItem extends React.Component<WalletsListItemProps, WalletsListItemState> {

  state = {
    balance: 0,
  }

  handlePress = (): void => {

    const {
      navigator,
      wallet,
    } = this.props
  
    // this.props.selectWallet(
    //   wallet.isMultisig(),
    //   wallet.address()
    // )
    navigator.push({
      screen: 'Wallet',
      passProps: {
        wallet: wallet,
      },
    })
  }

  calculateWalletBalance = () => {
    let res = {}
    let usd = 0
    const prices = this.props.prices
    console.log(
      '%s wallet (%s) balance calculation: %s',
      this.props.wallet.isMultisig() ? 'Multisig' : 'Main',
      this.props.sectionName,
      this.props.address
    )
    this.props.wallet.balances().items().map( (balance) => {
      const tokensArray = this.props.tokens.items()
      tokensArray.map( (tokenOfCurrentWallet) => {
        if (this.props.sectionName === tokenOfCurrentWallet.blockchain()) {
          const bAmount = balance.amount()
          const tSymbol = tokenOfCurrentWallet.symbol()
          const tAmount = this.props.tokens.item(tSymbol).removeDecimals(bAmount).toNumber()
          res[tSymbol] = tAmount

          const tokenPrice = prices[ tSymbol ] && prices[ tSymbol ][ this.props.selectedCurrency ] || null
          if (tokenPrice) {
            console.log('%s costs %s, amount: %s, usd: %s', tSymbol, tokenPrice, tAmount, tAmount * tokenPrice)
            usd += (tAmount * tokenPrice)
          }
        }
      })
    })
    // console.log(res, usd)
    return {
      tokens: res,
      balanceUSD: usd,
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
                      {this.props.selectedCurrency} {balanceUSD.toFixed(2)}
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
