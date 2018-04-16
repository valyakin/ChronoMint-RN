/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'utils/colors'

export default class SelectToken extends PureComponent {

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    const { tokens } = props
    const tokensArray = Object.keys(tokens).map( (k) => { return { symbol: k, amount: tokens[k] } } )
    this.state = {
      tokens: ds.cloneWithRows(tokensArray),
    }
  }

  handlePress = (token) => {
    this.props.navigator.pop()
    this.props.onPressAction(token)
  }

  renderRow = (rowData) => {
    const notEnoughAmount = rowData.amount ? null : styles.zeroAmount
    return (
      <TouchableOpacity onPress={() => this.handlePress(rowData)}>
        <View style={styles.tokenSelector}>
          <Text style={[styles.tokenSelectorLabel, styles.symbolColumn]}>
            {
              rowData.symbol
            }
          </Text>

          <Text style={[styles.tokenSelectorLabel, styles.amountColumn, notEnoughAmount]}>
            {
              rowData.amount.toFixed(2)
            }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const { tokens } = this.state
    return (
      <ListView
        style={styles.container}
        dataSource={tokens}
        renderRow={this.renderRow}
      />
    )
  }
}

// FIXME: need to use project's theme
const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  tokenSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424066',
  },
  tokenSelectorLabel: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  symbolColumn: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
  },
  amountColumn: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
  },
  zeroAmount: {
    color: '#C25351',
  },
})
