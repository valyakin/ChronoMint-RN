/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import WalletTransactions, { type WalletTransactionsProps } from '../screens/WalletTransactions'

type WalletTransactionsContainerProps = WalletTransactionsProps

class WalletTransactionsContainer extends PureComponent<WalletTransactionsContainerProps> {
  render () {
    return (<WalletTransactions
      {...this.props}
    />)
  }
}

export default WalletTransactionsContainer
