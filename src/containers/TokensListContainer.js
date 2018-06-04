/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent, type ComponentType } from 'react'
import { connect } from 'react-redux'
import {
  View,
} from 'react-native'
import {
  tokensAndAmountsSelector,
} from 'redux/mainWallet/selectors'

export type TokenInfo = {
  [symbol: string]: number
}

export type TTokensListProps = {
  blockchain: string,
  render(list: TokenInfo[]): ComponentType<TokenInfo[]>,
}

const makeMapStateToProps = (origState, origProps) => {
  const getTokensAmountList = tokensAndAmountsSelector(origProps.blockchain)
  const mapStateToProps = (state) => {
    const list = getTokensAmountList(state)
    return {
      list,
    }
  }
  return mapStateToProps
}

class TokensListContainer extends PureComponent<TTokensListProps & { list: TokenInfo[] }> {

  render () {
    return (
      <View>
        { this.props.render(this.props.list) }
      </View>
    )
  }

}

export default connect(makeMapStateToProps, null)(TokensListContainer)
