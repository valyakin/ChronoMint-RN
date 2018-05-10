/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import { Alert } from 'react-native'
import { BLOCKCHAIN_ETHEREUM } from 'dao/EthereumDAO'
import Wallet, {
  type TMainWalletModel,
  type TTab,
} from '../screens/Wallet'

type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}

type TWalletProps = {
  address: string,
  balance: any,
  blockchainTitle: string,
  navigator: any, // TODO: to implement a flow type for navigator
  prices: TPrices, // TODO: we do not need to get prices here and send it via props. It should be done on 'Send' screen
  tokens: any,
  wallet: TMainWalletModel,
}

type TWalletState ={
  tab: TTab,
}

class WalletContainer extends PureComponent<TWalletProps, TWalletState> {

  state = {
    tab: 'transactions',
  }

  handlePressTab = (tab: TTab) => () => {
    this.setState({ tab })
  }

  handleSend = (): void => {
    // [AO] This is temporary limitation. At the moment we can't send not-ETH funds
    if (this.props.blockchainTitle !== BLOCKCHAIN_ETHEREUM) {
      Alert.alert('Work in progress', 'Sorry, sending non-ETH funds still in development. Please choose Ethereum wallet.', [{ text: 'Ok', onPress: () => {}, style: 'cancel' }])
    } else {
      const {
        address,
        balance,
        blockchainTitle,
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
          blockchainTitle: blockchainTitle,
          prices: prices,
          selectedBlockchainName: blockchainTitle,
          tokens: tokens,
          wallet: wallet,
          walletAddress: address,
        },
      })
    }
  }

  handleNothing = () => {}

  render () {
    return (<Wallet
      address={this.props.address}
      balance={this.props.balance}
      blockchainTitle={this.props.blockchainTitle}
      onPressTab={this.handlePressTab}
      onSend={this.handleSend}
      prices={this.props.prices}
      tab={this.state.tab}
      tokens={this.props.tokens}
      wallet={this.props.wallet}
    />)
  }
}

export default WalletContainer
