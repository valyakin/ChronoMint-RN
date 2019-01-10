/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import isNumber from '../../common/utils/numeric'
import styles from './PrimaryTokenStyles'


export default class PrimaryToken extends PureComponent {

  static getFormattedBalance = (balance) => {
    if (!balance) {
      return ''
    } else {
      if (!isNumber(balance)) {
        return ''
      }

      if (balance > 0 && balance < 0.0001) {
        return '0.0000+'
      } else {
        return balance ? balance.toFixed(4) : balance.toFixed(2)
      }
    }
  }

  render () {
    const { token, whiteStyle } = this.props
    const balance = token && token.balance
    const balanceText = { ...styles.balanceText, ...whiteStyle }
    return (
      <View style={styles.balanceContainer}>
        <Text style={balanceText}>
          {
            token.symbol
          }
        </Text>
        <Text style={[balanceText, styles.balanceNumber]}>
          {
            PrimaryToken.getFormattedBalance(+balance)
          }
        </Text>
      </View>
    )
  }
}

PrimaryToken.propTypes = {
  token: PropTypes.shape({
    // amount: PropTypes.number,
    // symbol: PropTypes.string,
  }),
}
