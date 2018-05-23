/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import {
  Alert,
} from 'react-native'
import { BLOCKCHAIN_ETHEREUM } from 'dao/EthereumDAO'
import {
  getSelectedWalletBalanceInSelectedCurrency,
  makeGetMainWalletTransactionsByBlockchainName,
  makeGetWalletInfoByBockchainAndAddress,
  selectMainWalletTransactionsStore,
  getSelectedWalletStore,
  type TSelectedWallet,
} from 'redux/wallet/selectors'
import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import { DUCK_WALLET } from 'redux/wallet/actions'
import Wallet, {
  type TWalletProps,
  type TTab,
} from 'screens/Wallet'

export type TWalletContainerState ={
  tab: TTab,
}

const makeMapStateToProps = (origState, origProps) => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(origState)
  const getSelectedWalletTransactions = makeGetMainWalletTransactionsByBlockchainName(selectedWallet.blockchain, selectedWallet.address)
  const walletInfoByBcAndAddress = makeGetWalletInfoByBockchainAndAddress(origProps.blockchain, origProps.address)
  const mapStateToProps = (state, ownProps) => {
    const {
      prices,
      selectedCurrency,
    } = state.get(DUCK_MARKET)
    // const {
    //   address,
    //   blockchain,
    // } = state.get(DUCK_WALLET)
    const tokens = state.get(DUCK_TOKENS)
    // console.log('\n\n\n\nWALLET STATE:', state.get(DUCK_WALLET))
    const walletTransactions = getSelectedWalletTransactions(state, ownProps)
    const walletData = walletInfoByBcAndAddress(state, ownProps)
    return {
      // address,
      balanceCalc: getSelectedWalletBalanceInSelectedCurrency(state),
      // blockchain,
      mainWalletTransactionLoadingStatus: selectMainWalletTransactionsStore(state),
      prices,
      selectedCurrency,
      tokens,
      walletData,
      walletTransactions: walletTransactions,
    }
  }
  return mapStateToProps
}

type TWalletContainerProps = TWalletProps & {
  walletData: any, // TODO: to descibe flowtype
}

class WalletContainer extends PureComponent<TWalletContainerProps, TWalletContainerState> {

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
    // [AO] This is temporary limitation. At the moment we can't send not-ETH funds
    if (this.props.blockchain !== BLOCKCHAIN_ETHEREUM) {
      Alert.alert('Work in progress', 'Sorry, sending non-Ethereum funds still in development. Please choose Ethereum wallet to continue.', [{ text: 'Ok', onPress: () => {}, style: 'cancel' }])
    } else {
      const {
        address,
        balance,
        blockchain,
        prices,
        tokens,
        wallet,
      } = this.props

      this.props.navigator.push({
        screen: 'Send',
        title: 'Send Funds',
        passProps: {
          address: address,
          balance: balance,
          blockchain: blockchain,
          prices: prices,
          selectedBlockchainName: blockchain,
          tokens: tokens,
          wallet: wallet,
          walletAddress: address,
        },
      })
    }
  }

  handleNothing = () => {}

  render () {
    // console.log('Rendering wallet: ', this.props)
    return (
      <Wallet
        isMultisig={this.props.walletData.isMultisig}
        balanceCalc={this.props.walletData.balance}
        navigator={this.props.navigator}
        address={this.props.address}
        balance={this.props.balance}
        blockchain={this.props.blockchain}
        onPressTabTransactions={this.handleTransactionsTabClick}
        onPressTabOwners={this.handleOwnersTabClick}
        onPressTabTemplates={this.handleTemplatesTabClick}
        onPressTabTokens={this.handleTokensTabClick}
        onSend={this.handleSend}
        prices={this.props.prices}
        tab={this.state.tab}
        tokens={this.props.tokens}
        wallet={this.props.wallet}
        walletTransactions={this.props.walletTransactions}
        mainWalletTransactionLoadingStatus={this.props.mainWalletTransactionLoadingStatus}
      />
    )
  }

}

export default connect(makeMapStateToProps, null)(WalletContainer)
