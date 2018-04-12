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

import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import colors from 'utils/colors'
import MainWalletModel from 'models/wallet/MainWalletModel'
import MultisigWalletModel from 'models/wallet/MultisigWalletModel'
import { calculateWalletBalance } from 'utils/calculations'

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
      {tokensStrings || ''}
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

  handlePress = (tokens, balance): void => {

    const {
      navigator,
      wallet,
      address,
      prices,
      sectionName,
    } = this.props
  
    this.props.selectWallet(
      wallet,
      address
    )

    navigator.push({
      screen: 'Wallet',
      passProps: {
        wallet: wallet,
        address: address,
        tokens: tokens,
        balance: balance,
        prices: prices,
        blockchainTitle: sectionName,
      },
    })
  }

  render () {
    const {
      wallet,
      address,
    } = this.props

    const { tokens, balance } = calculateWalletBalance(
      this.props.wallet,
      this.props.prices,
      this.props.tokens,
      this.props.selectedCurrency,
      this.props.sectionName,
    )

    // TODO: to optimize (rewrite it)
    let walletTitle = `My ${this.props.sectionName} Wallet`
    if (wallet.isMultisig()) {
      walletTitle = wallet.isTimeLocked() ? 'My TimeLocked Wallet' : 'My Shared wallet'
    }

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.handlePress(tokens, balance)}
      >

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
                {this.props.selectedCurrency} {balance}
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
