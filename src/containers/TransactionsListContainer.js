/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'
import TransactionsList from 'components/TransactionsList'
import {
  getSelectedWalletStore,
  selectMainWalletTransactionsStore,
  makeGetWalletTransactionsByBlockchainAndAddress,
  type TSelectedWallet,
} from 'redux/wallet/selectors'
import { getAccountTransactions } from 'redux/mainWallet/actions'

const makeMapStateToProps = (origState) => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(origState)
  const walletTransactionsByBcAndAddress = makeGetWalletTransactionsByBlockchainAndAddress(selectedWallet.blockchain, selectedWallet.address)
  const mapStateToProps = (state, ownProps) => {
    const {
      transactions,
      latestTransactionDate,
    } = walletTransactionsByBcAndAddress(state, ownProps)
    return {
      latestTransactionDate,
      mainWalletTransactionLoadingStatus: selectMainWalletTransactionsStore(state),
      transactions,
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => ({
  refreshTransactionsList: () => dispatch(getAccountTransactions()),
})

export default connect(makeMapStateToProps, mapDispatchToProps)(TransactionsList)
