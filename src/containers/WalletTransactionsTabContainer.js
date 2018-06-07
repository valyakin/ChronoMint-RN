/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import WalletTransactions, { type TWalletTransactionsProps } from 'screens/WalletTransactions'
import {
  getSelectedWalletStore,
  makeGetWalletTransactionsByBlockchainAndAddress,
  type TSelectedWallet,
} from 'redux/wallet/selectors'
import { getAccountTransactions } from 'redux/mainWallet/actions'

type TWalletTransactionsContainerProps = TWalletTransactionsProps

const makeMapStateToProps = (origState) => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(origState)
  // const getSelectedWalletTransactions = makeGetMainWalletTransactionsByBlockchainName(selectedWallet.blockchain, selectedWallet.address)
  const walletTransactionsByBcAndAddress = makeGetWalletTransactionsByBlockchainAndAddress(selectedWallet.blockchain, selectedWallet.address)
  const mapStateToProps = (state, ownProps) => {
    // const walletTransactions = getSelectedWalletTransactions(state, ownProps)
    const transactions = walletTransactionsByBcAndAddress(state, ownProps)
    return {
      transactions,
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  refreshTransactionsList: () => dispatch(getAccountTransactions()),
})

class WalletTransactionsContainer extends PureComponent<TWalletTransactionsContainerProps, {}> {

  render () {
    return (
      <WalletTransactions
        {...this.props}
      />
    )
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(WalletTransactionsContainer)
