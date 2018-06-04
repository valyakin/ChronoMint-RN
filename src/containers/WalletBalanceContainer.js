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
  walletBalanceSelector,
} from 'redux/mainWallet/selectors'

export type TWalletBalanceContainerProps = {
  blockchain: string,
  render(balance: number): ComponentType<TWalletBalanceContainerProps>,
}

const makeMapStateToProps = (origState, origProps) => {
  const getWalletBalanceOnly = walletBalanceSelector(origProps.blockchain)

  const mapStateToProps = (state) => {
    const balance = getWalletBalanceOnly(state)

    return {
      balance,
    }
  }
  return mapStateToProps
}

class WalletBalanceContainer extends PureComponent<TWalletBalanceContainerProps & { balance: number} > {

  render () {
    return (
      <View>
        { this.props.render(this.props.balance) }
      </View>
    )
  }

}

export default connect(makeMapStateToProps, null)(WalletBalanceContainer)
