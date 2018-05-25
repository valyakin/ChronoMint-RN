/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import colors from 'utils/colors'

export type TToken = {
  id: string,
  amount: number,
  image: any,
}

export type TBalance = {
  currency: string,
  amount: number,
}

export type TWallet = {
  tokens: Array<TToken>,
  balance: TBalance,
}

type TWalletTokensProps = {
  wallet: TWallet,
  onSelectToken: (token: TToken) => () => void,
}

type TTokenProps = TToken & {
  balance: TBalance,
  onSelectToken: () => void,
}

export default class WalletTokens extends PureComponent<TWalletTokensProps, {}> {
  keyExtractor = (id: string) => id

  renderItem = ({ item }: { item: TToken }) =>
    (<Token
      {...item}
      balance={this.props.wallet.balance}
      onSelectToken={this.props.onSelectToken(item)}
    />)

  render () {
    return (
      <FlatList
        data={this.props.wallet.tokens}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={styles.list}
      />
    )
  }
}

class Token extends PureComponent<TTokenProps, {}> {
  render () {
    const {
      amount,
      balance,
      id,
      image,
    } = this.props

    const strings = {
      amount: I18n.toNumber(amount, { precision: 2 }),
      balanceAmount: I18n.toNumber(balance.amount, { precision: 2 }),
    }

    return (
      <View style={styles.token}>
        { image && (
          <Image
            source={image}
            style={styles.image}
          />
        ) }
        <Text style={styles.value}>
          { id }
          &nbsp;
          { strings.amount }
        </Text>
        <Text style={styles.balance}>
          { balance.currency }
          &nbsp;
          { strings.balanceAmount }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  balance: {
    fontWeight: '200',
    margin: 8,
  },
  image: {
    height: 32,
    margin: 8,
    width: 32,
  },
  list: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  token: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 3,
    flexDirection: 'row',
    margin: 8,
    padding: 8,
  },
  value: {
    fontWeight: '700',
    margin: 8,
  },
})

