/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import WalletTokens, { type TToken, type TWallet } from '../screens/WalletTokens'

type TWalletTokensContainerProps = {
  wallet: TWallet,
}

class WalletTokensContainer extends PureComponent<TWalletTokensContainerProps, {}> {
  /* eslint-disable-next-line no-unused-vars */
  handleSelectToken = (token: TToken) => () => {
    throw 'Not implemented yet'
  }
  
  render () {
    return (<WalletTokens
      wallet={this.props.wallet}
      onSelectToken={this.handleSelectToken}
    />)
  }
}

export default WalletTokensContainer
