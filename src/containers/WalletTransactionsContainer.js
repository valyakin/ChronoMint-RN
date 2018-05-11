/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import WalletTransactions, { type TWalletTransactionsProps } from '../screens/WalletTransactions'

type TWalletTransactionsContainerProps = TWalletTransactionsProps

class WalletTransactionsContainer extends PureComponent<TWalletTransactionsContainerProps, {}> {
  render () {
    return (
      <WalletTransactions
        {...this.props}
      />
    )
  }
}

export default WalletTransactionsContainer
