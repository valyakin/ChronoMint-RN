/* @flow */
import * as React from 'react'
import { View, Image, Text, StyleSheet, FlatList } from 'react-native'
import I18n from 'react-native-i18n'
import images from '../assets/images'
import colors from '../utils/colors'

export default class TransactionsList extends React.Component<Props> {
  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <TransactionItem {...item} /> 

  render () {
    const { transactions } = this.props

    if (!transactions || transactions.length < 1) {
      return null
    }
    
    return (
      <FlatList
        data={transactions}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}

class TransactionItem extends React.Component<TransactionProps> {
  render () {
    const { address, type, confirmations, value, symbol } = this.props

    return (
      <View style={styles.item}>
        <Image
          source={transactionImages[type][confirmations]}
          style={styles.transactionImage}
        />
        <View>
          <Text />
        </View>
        <Text
          style={styles.itemText}
          ellipsizeMode='middle'
          numberOfLines={2}
        >
          {I18n.t(`TransactionsList.${type}`)}
          {'\n'}
          {address}
        </Text>
        <Text style={[ styles.transactionValue, transactionValueStyles[type] ]}>
          {I18n.toCurrency(value, { precision: 2, unit: ` ${symbol} ` })}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  itemText: {
    flexShrink: 1,
    marginHorizontal: 8,
    fontSize: 13,
  },
})

/* eslint-disable react-native/no-unused-styles */
const transactionValueStyles = StyleSheet.create({
  receiving: {
    color: colors.green,
  },
  sending: {
    color: colors.foreground,
  },
})
/* eslint-enable react-native/no-unused-styles */

const transactionImages = {
  receiving: {
    1: images.transactionReceiving1,
  },
  sending: {
    1: images.transactionSending1,
  },
}

type Props = {
  transactions?: Array<TransactionProps> 
}

type TransactionProps = {
  id: string,
  type: 'receiving' | 'sending',
  address: string,
  confirmations: number,
  symbol: string,
  value: number,
}
