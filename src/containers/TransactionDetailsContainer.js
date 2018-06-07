/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'
import TransactionDetails from 'screens/TransactionDetails'
import {
  getSelectedWalletStore,
  // selectMainWalletTransactionsStore,
  makeGetWalletTransactionsByBlockchainAndAddress,
  type TSelectedWallet,
} from 'redux/wallet/selectors'

const makeMapStateToProps = (origState) => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(origState)
  const walletTransactionsByBcAndAddress = makeGetWalletTransactionsByBlockchainAndAddress(selectedWallet.blockchain, selectedWallet.address)
  const mapStateToProps = (state, ownProps) => {
    const {
      transactions,
      latestTransactionDate,
    } = walletTransactionsByBcAndAddress(state, ownProps)
    return {
      confirmations,
      selectedCurrency,
      tokenPrice,
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(TransactionDetails)
