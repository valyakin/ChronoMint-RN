/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import {
  Alert,
} from 'react-native'
import { BLOCKCHAIN_ETHEREUM } from 'dao/EthereumDAO'
import {
  getSelectedWalletBalanceInSelectedCurrency,
  getSelectedWalletStore,
  // makeGetMainWalletTransactionsByBlockchainName,
  makeGetWalletInfoByBockchainAndAddress,
  makeGetWalletTransactionsByBlockchainAndAddress,
  selectMainWalletTransactionsStore,
  type TSelectedWallet,
} from 'redux/wallet/selectors'
// import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import Wallet, {
  type TWalletProps,
  type TTab,
} from 'screens/Wallet'
import { getAccountTransactions } from 'redux/mainWallet/actions'

export type TWalletContainerState ={
  tab: TTab,
}

type TWalletContainerProps = TWalletProps & {
  walletData: any, // TODO: to descibe flowtype
  selectedWallet: TSelectedWallet,
  getAccountTransactions: any,
  transactions: any,
}

const makeMapStateToProps = (origState /*, origProps*/) => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(origState)
  // const getSelectedWalletTransactions = makeGetMainWalletTransactionsByBlockchainName(selectedWallet.blockchain, selectedWallet.address)
  const walletInfoByBcAndAddress = makeGetWalletInfoByBockchainAndAddress(selectedWallet.blockchain, selectedWallet.address)
  const walletTransactionsByBcAndAddress = makeGetWalletTransactionsByBlockchainAndAddress(selectedWallet.blockchain, selectedWallet.address)
  const mapStateToProps = (state, ownProps) => {
    // const {
    //   // prices,
    //   selectedCurrency,
    // } = state.get(DUCK_MARKET)
    const tokens = state.get(DUCK_TOKENS)
    // const walletTransactions = getSelectedWalletTransactions(state, ownProps)
    const walletData = walletInfoByBcAndAddress(state, ownProps)
    return {
      balanceCalc: getSelectedWalletBalanceInSelectedCurrency(state),
      mainWalletTransactionLoadingStatus: selectMainWalletTransactionsStore(state),
      // prices,
      // selectedCurrency,
      tokens,
      walletData,
      selectedWallet,
      transactions: walletTransactionsByBcAndAddress,
      // walletTransactions: walletTransactions,
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getAccountTransactions: () => dispatch(getAccountTransactions()),
})

class WalletContainer extends PureComponent<TWalletContainerProps, TWalletContainerState> {

  constructor (props){
    super(props)
    this.props.navigator.setTitle({ title: `My ${props.selectedWallet.blockchain} Wallet` }) // TODO: to fix bug with blinking header
  }

  state = {
    tab: 'transactions',
  }

  handleTransactionsTabClick = () => {
    this.setState({ tab: 'transactions' })
  }

  handleOwnersTabClick = () => {
    this.setState({ tab: 'owners' })
  }

  handleTemplatesTabClick = () => {
    this.setState({ tab: 'templates' })
  }

  handleTokensTabClick = () => {
    this.setState({ tab: 'tokens' })
  }

  handleSend = () => {
    // TODO: [AO] This is temporary limitation. At the moment we can't send not-ETH funds
    if (this.props.selectedWallet.blockchain !== BLOCKCHAIN_ETHEREUM) {
      Alert.alert('Work in progress', 'Sorry, sending non-Ethereum funds still in development. Please choose Ethereum wallet to continue.', [{ text: 'Ok', onPress: () => {}, style: 'cancel' }])
    } else {
      const {
        address,
        // balance,
        blockchain,
        // prices,
      } = this.props

      this.props.navigator.push({
        screen: 'Send',
        title: 'Send Funds',
        passProps: {
          address: address,
          // balance: balance,
          blockchain: blockchain,
          // prices: prices,
          // selectedBlockchainName: blockchain,
          // walletAddress: address,
        },
      })
    }
  }

  onPressTransactionsRefresh = () => {
    this.props.getAccountTransactions()
  }

  render () {
    return (
      <Wallet
        address={this.props.selectedWallet.address}
        balance={this.props.walletData.balance}
        blockchain={this.props.selectedWallet.blockchain}
        isMultisig={this.props.walletData.isMultisig}
        latestTransactionDate={this.props.walletData.latestTransactionDate}
        mainWalletTransactionLoadingStatus={this.props.mainWalletTransactionLoadingStatus}
        navigator={this.props.navigator}
        onPressTabOwners={this.handleOwnersTabClick}
        onPressTabTemplates={this.handleTemplatesTabClick}
        onPressTabTokens={this.handleTokensTabClick}
        onPressTabTransactions={this.handleTransactionsTabClick}
        onSend={this.handleSend}
        tab={this.state.tab}
        tokensLength={this.props.walletData.tokensLength}
        walletMode={this.props.walletData.walletMode}
      />
    )
  }

}

export default connect(makeMapStateToProps, mapDispatchToProps)(WalletContainer)
