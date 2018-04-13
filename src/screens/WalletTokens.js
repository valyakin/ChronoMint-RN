/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import colors from 'utils/colors'

export default class WalletTokens extends React.PureComponent {

  keyExtractor = (id: string) => id

  renderItem = (item) => <Token token={item} balance={this.props.wallet.balance} />

  render () {
    return (
      <FlatList
        data={this.props.wallet.tokens}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.list}
      />
    )
  }
}

class Token extends React.PureComponent {
  render () {
    const { id, amount, image } = this.props.token
    const { balance } = this.props
    return (
      <View style={styles.token}>
        { image && <Image source={image} style={styles.image} /> }
        <Text style={styles.value}>
          {id}
          &nbsp;
          {I18n.toNumber(amount, { precision: 2 })}
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

