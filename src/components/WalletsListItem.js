/* @flow */
import * as React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../utils/colors'
import WalletImage from './WalletImage'

/**
 * Alexey Ozerov:
 * I know that there is the following syntax available:
 * import type { TExchange, TTokenList } from '../types'
 * 
 * But in this case IDE's (VSCode) hints stop working. :-(
 * See how it should looks:
 * http://ozerov.pro/root/apitracker/uploads/18e05f3575ed0141a933bd77eaf3682f/Screen_Shot_2018-04-04_at_16.02.24.png
 */
import {
  type TExchange,
  type TTokenList,
  type TTransactionList,
  type TWallet,
} from '../types'

const Transactions = ({ transactions }: { transactions?: TTransactionList }) => !transactions ? null : (
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

const TokensList = ({ tokens }: { tokens?: TTokenList }) => {
  if (!tokens || !tokens.length) {
    return null
  }

  const tLength = tokens.length
  let tokensText = [tokens[0].id, tokens[0].amount.toFixed(2)].join(' ')
  if (tLength === 2) {
    const secondTokenText = [tokens[1].id, tokens[1].amount.toFixed(2)].join(' ')
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

const Exchange = ({ exchange }: { exchange?: TExchange }) => !exchange ? null : (
  <Text style={styles.exchange}>
    {exchange.currency} {exchange.amount}
  </Text>
) 

export default class WalletsListItem extends React.Component<TWallet & { navigator: any }, {}> {

  handlePress = (): void => {
    const { navigator, mode, address, tokens, balance } = this.props
    navigator.push({
      screen: 'Wallet',
      passProps: {
        mode,
        address,
        tokens,
        balance,
      },
    })
  }

  render () {
    const {
      address,
      balance,
      exchange,
      image,
      mode,
      title,
      tokens,
      transactions,
    } = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handlePress}
      >
        <View style={styles.transactions}>
          <Transactions transactions={transactions} />
        </View>
        <View style={styles.content}>
          <WalletImage
            image={image}
            walletMode={mode}
            style={styles.image}
          />
          <View style={styles.contentColumn}>
            <Text style={styles.title}>
              {title}
            </Text>
            <Text style={styles.address}>
              {address}
            </Text>
            <Text style={styles.balance}>
              {balance.currency} {balance.amount.toFixed(2)}
            </Text>
            <TokensList tokens={tokens} />
            <Exchange exchange={exchange} />
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
