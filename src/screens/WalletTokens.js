/* @flow */
import * as React from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import colors from '../utils/colors'

export default class WalletTokens extends React.Component {
  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <Token {...item} />

  render () {
    return (
      <FlatList
        data={this.props.tokens}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.list}
      />
    )
  }
}

class Token extends React.Component {
  render () {
    const { image, symbol, value, balance } = this.props
    return (
      <View style={styles.token}>
        { image && <Image source={image} style={styles.image} /> }
        <Text style={styles.value}>
          {symbol}
          &nbsp;
          {I18n.toNumber(value, { precision: 2 })}
        </Text>
        <Text style={styles.balance}>
          {balance.currency}
          &nbsp;
          {I18n.toNumber(balance.amount, { precision: 2 })}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  image: {
    width: 32,
    height: 32,
    margin: 8,
  },
  value: {
    margin: 8,
    fontWeight: '700',
  },
  balance: {
    margin: 8,
    fontWeight: '200',
  },
  token: {
    backgroundColor: colors.background,
    margin: 8,
    padding: 8,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

