/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { getBitcoinCurrentWallet } from '@chronobank/bitcoin/redux/selectors'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import Wallet from './Wallet'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    selectedCurrency: selectCurrentCurrency(state),
    currentBTCWallet: getBitcoinCurrentWallet(masterWalletAddress)(state),
    currentETHWallet: getCurrentEthWallet(masterWalletAddress)(state),
  }
}

class WalletContainer extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    currentBTCWallet: PropTypes.shape({}),
    currentETHWallet: PropTypes.shape({}),
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          blockchain: PropTypes.string,
        }),
      }),
    }),
  }

  handleSend = () => {
    // TODO: [AO] This is temporary limitation. At the moment we can't send not-ETH funds
    const {
      navigate,
      state,
    } = this.props.navigation
    const {
      blockchain,
    } = state.params
    const params = {
      blockchain,
    }


    const path = blockchain === BLOCKCHAIN_ETHEREUM ? 'SendEth' : 'Send'
    navigate(path, params)
  }

  handleReceive = () => {
    Alert.alert(
      'Work in progress',
      'Sorry, receiving is under construction still.',
      [{ text: 'Ok', onPress: () => { }, style: 'cancel' }]
    )
  }

  handleIndexChange = (index) =>
    this.setState({
      // [AO] This state is using via onIndexChange below
      // eslint-disable-next-line react/no-unused-state
      index,
    })

  render () {
    const {
      blockchain,
    } = this.props.navigation.state.params
    const { currentBTCWallet, currentETHWallet, navigation, selectedCurrency } = this.props
    const currentWallet = blockchain === BLOCKCHAIN_ETHEREUM
      ? currentETHWallet
      : currentBTCWallet
    const latestTransactionDate =
      currentWallet &&
      currentWallet.transactions &&
      currentWallet.transactions.latestTxDate
      || null
    const transactions =
      currentWallet &&
      currentWallet.transactions &&
      currentWallet.transactions.txList
      || []
    return (
      <Wallet
        blockchain={blockchain}
        navigation={navigation}
        latestTransactionDate={latestTransactionDate}
        transactions={transactions}
        address={currentWallet.address}
        selectedCurrency={selectedCurrency}
        onSend={this.handleSend}
        onReceive={this.handleReceive}
      />
    )
  }
}

export default connect(mapStateToProps, null)(WalletContainer)
