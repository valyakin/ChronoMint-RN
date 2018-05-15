/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  ListView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from './styles/SelectTokenStyles'

export type TSelectTokenProps = {
  tokens: any[],
  onPressAction(token: any): void,
  navigator: any,
}
export type TSelectTokenState = {}

export default class SelectToken extends PureComponent<TSelectTokenProps, TSelectTokenState> {

  constructor (props: TSelectTokenProps) {
    super(props)
    // console.log(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    const { tokens } = props
    const tokensArray = Object.keys(tokens)
      .map( (k) => {
        return { symbol: k, amount: tokens[k] }
      } )
    console.log(tokensArray)
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
      <TouchableOpacity onPress={this.handlePress(rowData)}>
        <View style={styles.tokenSelector}>
          <Text
            style={[
              styles.tokenSelectorLabel,
              styles.symbolColumn,
            ]}
          >
            {
              rowData.symbol
            }
          </Text>

          <Text
            style={[
              styles.tokenSelectorLabel, 
              styles.amountColumn, 
              notEnoughAmount,
            ]}
          >
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
