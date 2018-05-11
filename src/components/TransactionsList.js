/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import TransactionIcon, { type TTransactionType } from 'components/TransactionIcon'
import styles from './styles/TransactionsListStyles'

type TWalletTransaction = {
  address: string,
  amount: number,
  confirmations: number,
  symbol: string,
  type: TTransactionType,
}

type TTransactionsListProps = {
  walletTransactions: TWalletTransaction[]
}
type TTransactionsListState = {}
type TTransactionItemState = {}

export default class TransactionsList extends PureComponent<TTransactionsListProps, TTransactionsListState> {

  keyExtractor = ({ id }: { id: string } ) => id

  renderItem = ({ item }: { item: TWalletTransaction } ) => <TransactionItem {...item} />

  render () {
    const { walletTransactions } = this.props

    if (!walletTransactions || walletTransactions.length < 1) {
      return null
    }
    
    return (
      <FlatList
        data={walletTransactions}
        renderItem={this.renderItem}
      />
    )
  }
}

class TransactionItem extends PureComponent<TWalletTransaction, TTransactionItemState> {
  render () {
    const {
      address,
      confirmations,
      symbol,
      type,
      amount,
    } = this.props

    const transactionStyle = type === 'sending'
      ? styles.sending
      : styles.receiving

    const tType = I18n.t(`TransactionsList.${type}`)
    const currency = I18n.toCurrency(amount, { precision: 2, unit: ` ${symbol} ` })

    return (
      <View style={styles.item}>
        <TransactionIcon
          type={type}
          confirmations={confirmations}
        />
        <View>
          <Text />
        </View>
        <Text
          style={styles.itemText}
          ellipsizeMode='middle'
          numberOfLines={2}
        >
          {
            tType
          }
          {'\n'}
          {
            address
          }
        </Text>
        <Text style={transactionStyle}>
          {
            currency
          }
        </Text>
      </View>
    )
  }
}

