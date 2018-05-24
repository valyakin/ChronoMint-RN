/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import moment from 'moment'
import Separator from 'components/Separator'
import styles from 'components/styles/TransactionsListStyles'
import TransactionIcon, { type TTransactionType } from 'components/TransactionIcon'

export type TWalletTransaction = {
  address: string,
  amount: number,
  confirmations: number,
  symbol: string,
  type: TTransactionType,
}

export type TWalletTransactionList = TWalletTransaction[]

export type TTransactionsListProps = {
  transactions: TWalletTransactionList,
  mainWalletTransactionLoadingStatus: any,
  latestTransactionDate: any,
  refreshTransactionsList(): void,
}

type TTransactionsListState = {}

type TTransactionItemState = {}

export default class TransactionsList extends PureComponent<TTransactionsListProps, TTransactionsListState> {

  componentDidMount () {
    const trLoadingStatus = this.props.mainWalletTransactionLoadingStatus
    if (!trLoadingStatus.isFetching &&
      !trLoadingStatus.isInited
    ) {
      this.props.refreshTransactionsList()
    }
  }

  keyExtractor = (item: TWalletTransaction, index: number) => '' + item.address + '_' + index

  renderItem = ({ item }: { item: TWalletTransaction } ) => <TransactionItem {...item} />

  // eslint-disable-next-line complexity
  render () {

    const {
      transactions,
      mainWalletTransactionLoadingStatus,
      latestTransactionDate,
      refreshTransactionsList,
    } = this.props

    const lastTransactionDate = latestTransactionDate && moment
      .unix(latestTransactionDate)
      .format('DD MMMM YYYY') || null

    const TransactionsLoading = () => (
      <View style={styles.transactionsListContainer}>
        <Text style={styles.transactionsListTitle}>
            Loading Transactions ...
        </Text>
        <Separator />
        <ActivityIndicator />
      </View>
    )

    const NoTransactionsExists = () => (
      <View style={styles.transactionsListContainer}>
        <Text style={styles.transactionsListTitle}>
            No transactions at the moment.
        </Text>
      </View>
    )

    const RefreshTransactions = () => (
      <View style={styles.transactionsListContainer}>
        <TouchableOpacity
          onPress={refreshTransactionsList}
          style={styles.refreshTouch}
        >
          <Text style={styles.refreshText}>
            No transactions available. Tap to refresh.
          </Text>
          <View style={styles.refreshImage}>
            <Image
              source={require('../images/temporary-reload-icon.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    )

    const LoadedTransactions = () => {
      return (
        <View style={styles.transactionsListContainer}>
          <Text style={styles.transactionsListTitle}>
            {
              lastTransactionDate
            }
          </Text>
          <Separator />
          <FlatList
            data={transactions}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      )
    }

    // FIXME: [AO] in some conditions it can return null
    if (mainWalletTransactionLoadingStatus.isFetching) {
      return ( <TransactionsLoading /> )
    } else {
      if (mainWalletTransactionLoadingStatus.isInited) {
        if (mainWalletTransactionLoadingStatus.isFetched) {
          if (lastTransactionDate) {
            return ( <LoadedTransactions /> )
          } else {
            return (<NoTransactionsExists /> )
          }
        }
      } else {
        return ( <TransactionsLoading /> )
      }
    }
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

