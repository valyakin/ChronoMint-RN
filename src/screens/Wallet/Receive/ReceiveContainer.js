/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Clipboard } from 'react-native'
import PropTypes from 'prop-types'
import Receive from './Receive'

export default class ReceiveContainer extends PureComponent {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          blockchain: PropTypes.string,
          currentWallet: PropTypes.shape({}),
        }),
      }),
    }),
  }

  handleCopyAddress = (address) => {
    Clipboard.setString(address)
  }

  render () {
    const {
      blockchain,
      currentWallet,
    } = this.props.navigation.state.params

    return (
      <Receive
        blockchain={blockchain}
        currentWallet={currentWallet}
        onCopyAddress={this.handleCopyAddress}
      />
    )
  }
}

