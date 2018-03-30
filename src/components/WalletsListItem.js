/* @flow */
import * as React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import WalletImage from './WalletImage'

export type Token = { id: string, amount: number }

export type Transaction = { status?: 'receiving' | null }

export type ExchangeType = { currency: string, amount: number }

export type WalletMode = '2fa' | 'shared' | 'timeLocked'

export type WalletListItemProps = {
  title: string,
  address: string,
  balance: {
    currency: string,
    amount: number
  },
  transactions?: Transaction[],
  tokens?: Token[],
  exchange?: ExchangeType,
  image?: number,
  mode?: WalletMode,
}

const Transactions = ({ transactions }: Transaction[]) => !transactions ? null : (
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

const TokensList = ({ tokens }: Token[]) => !(tokens || [])[0] ? null : (
  <Text style={styles.tokens}>
    {tokens[0].id} {tokens[0].amount.toFixed(2)}
    {tokens[1] && ', '}
    {tokens[2] ?
      `+ ${tokens.length - 1} more` :
      `${tokens[1].id} ${tokens[1].amount.toFixed(2)}`
    }
  </Text>
)

const Exchange = ({ exchange }: ExchangeType) => !exchange ? null : (
  <Text style={styles.exchange}>
    {exchange.currency} {exchange.amount}
  </Text>
) 

export default class WalletsListItem extends React.Component<WalletListItemProps, {}> {
  handlePress = () => {
    const { navigator, mode, address, token } = this.props
    navigator.push({
      screen: 'Wallet',
      passProps: {
        mode,
        address,
        token,
      },
    })
  }

  render () {
    const { title, address, balance } = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <View style={styles.transactions}>
          <Transactions transactions={this.props.transactions} />
        </View>
        <View style={styles.content}>
          <WalletImage
            image={this.props.image}
            walletMode={this.props.mode}
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
            <TokensList tokens={this.props.tokens} />
            <Exchange exchange={this.props.exchange} />
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
