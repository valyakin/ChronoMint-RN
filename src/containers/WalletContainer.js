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
  getSelectedWalletStore,
  type TSelectedWallet,
} from 'redux/wallet/selectors'
import Wallet, {
  type TWalletProps,
  type TTab,
} from 'screens/Wallet'
import { getAccountTransactions } from 'redux/mainWallet/actions'

export type TWalletContainerState ={
  tab: TTab,
}

type TWalletContainerProps = TWalletProps & {
  address: string,
  blockchain: string,
}

const makeMapStateToProps = (origState) => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(origState)

  const mapStateToProps = (state) => {
    return {
      selectedWallet,
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
        blockchain,
      } = this.props

      this.props.navigator.push({
        screen: 'Send',
        title: 'Send Funds',
        passProps: {
          address: address,
          blockchain: blockchain,
        },
      })
    }
  }

  handleReceive = () => {
    Alert.alert('Work in progress', 'Sorry, receiving is under construction still.', [{ text: 'Ok', onPress: () => {}, style: 'cancel' }])
  }

  onPressTransactionsRefresh = () => {
    this.props.getAccountTransactions()
  }

  render () {
    return (
      <Wallet
        address={this.props.selectedWallet.address}
        blockchain={this.props.selectedWallet.blockchain}
        navigator={this.props.navigator}
        onPressTabOwners={this.handleOwnersTabClick}
        onPressTabTemplates={this.handleTemplatesTabClick}
        onPressTabTokens={this.handleTokensTabClick}
        onPressTabTransactions={this.handleTransactionsTabClick}
        onSend={this.handleSend}
        onReceive={this.handleReceive}
        tab={this.state.tab}
      />
    )
  }

}

export default connect(makeMapStateToProps, mapDispatchToProps)(WalletContainer)
