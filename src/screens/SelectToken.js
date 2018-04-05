/* @flow */
import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import colors from '../utils/colors'
import {
  type TToken,
  type TTokenList,
  // type TWallet,
} from '../types'

interface SelectTokenProps {
  tokens: TTokenList;
  navigator: any; // FIXME
  onPressAction: (token: TToken) => void;
}

type SelectTokenState = {
  tokens: TTokenList,
}

export default class SelectToken extends Component<SelectTokenProps, SelectTokenState> {

  constructor (props: SelectTokenProps) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1: TToken, r2: TToken) => r1.id !== r2.id })
    const { tokens } = props
    this.state = {
      tokens: ds.cloneWithRows(tokens),
    }
  }

  handlePress = (token: TToken) => {
    this.props.navigator.pop()
    this.props.onPressAction(token)
  }

  renderRow = (rowData: TToken) => {
    return (
      <TouchableOpacity onPress={() => this.handlePress(rowData)}>
        <View style={styles.tokenSelector}>
          <Text style={styles.tokenSelectorLabel}>
            {
              rowData.id
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
    // borderBottomWidth: 0.5,
    // borderColor: '#4488A7',
    // borderTopWidth: 0.5,
  },
  tokenSelectorLabel: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
})
