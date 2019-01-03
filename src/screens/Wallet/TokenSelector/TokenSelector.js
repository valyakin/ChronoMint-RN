/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  View,
  FlatList,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import WalletImage from '../../../components/WalletImage'
import { ETH_PRIMARY_TOKEN, BLOCKCHAIN_ETHEREUM} from '@chronobank/ethereum/constants'
import styles from './TokenSelectorStyles'

const blockchains = {
  [ETH_PRIMARY_TOKEN]: BLOCKCHAIN_ETHEREUM,
}

export default class TokenSelector extends React.Component {

  keyExtractor = (item, index) =>
    '' + item.amount + '_' + item.symbol + '_' + index

  renderTokenItem = ({item}) => {
    const { symbol, balance } = item
    const {prices, selectedCurrency} = this.props
    const price = prices[symbol] ? prices[symbol][selectedCurrency] : 0
    const amountInCurrency = balance * price
    const formattedBalance = balance > 0 ? balance.toFixed(2) : balance
    const formattedAmountInCurrency = amountInCurrency > 0 ? amountInCurrency.toFixed(2) : amountInCurrency
    const blockchain = blockchains[symbol] ? blockchains[symbol] : 'default'
    return (
      <View style={styles.tokenContainer}>
        <WalletImage
          blockchain={blockchain}
        />
        <View style={styles.containerItem}>
          <Text style={styles.itemText}>
            {symbol}
          </Text>
          <Text style={styles.itemText}>
            {formattedBalance}
          </Text>
        </View>
        <View style={styles.containerItem}>
          <Text style={styles.itemText}>
            {selectedCurrency}
          </Text>
          <Text style={styles.itemText}>
            {formattedAmountInCurrency}
          </Text>
        </View>
      </View>
    )
  }

  render () {
    const { tokens } = this.props
    return (
      <View style={styles.screenView}>
        <FlatList
          data={tokens}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderTokenItem}
        />
      </View>
    )
  }
}

TokenSelector.propTypes = {
}
