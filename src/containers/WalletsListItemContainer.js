/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import { type Dispatch } from 'redux'
import { DUCK_MARKET } from 'redux/market/action'
import { selectWallet } from 'redux/wallet/actions'
import WalletsListItem, {
  type TWalletsListItemProps,
} from 'components/WalletsListItem'
import {
  makeGetWalletTokensAndBalanceByAddress,
  makeGetWalletInfoByBockchainAndAddress,
} from 'redux/wallet/selectors'

type TWalletsListItemContainerProps = TWalletsListItemProps & {
  selectWallet(blockchain: string, address: string): void,
  navigator: any,
}

const makeMapStateToProps = (origState, origProps) => {
  const walletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress(origProps.blockchain, origProps.address)
  const walletInfoByBcAndAddress = makeGetWalletInfoByBockchainAndAddress(origProps.blockchain, origProps.address)
  const mapStateToProps = (state, ownProps) => {
    const balanceAndTokens = walletTokensAndBalanceByAddress(state, ownProps)
    const walletInfo = walletInfoByBcAndAddress(state, ownProps)
    const {
      selectedCurrency,
    } = state.get(DUCK_MARKET)

    return {
      blockchain: origProps.blockchain,
      selectedCurrency,
      ...balanceAndTokens,
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  selectWallet: (blockchain: string, address: string) =>
    dispatch(selectWallet(blockchain, address)),
})

class WalletsListItemContainer extends PureComponent<TWalletsListItemContainerProps> {

  handleItemPress = (blockchain: string, address: string): void => {
  
    this.props.selectWallet(
      blockchain,
      address,
    )

    // Now we have info about selected wallet in Redux store
    // Wallet will use this info by itself
    this.props.navigator.push({
      screen: 'Wallet',
    })
  }

  render () {
    // console.log('WALLET INFO:')
    // console.log(this.props.walletInfo)
    const {
      address,
      balance,
      blockchain,
      selectedCurrency,
      tokens,
      walletMode,
    } = this.props

    return (
      <WalletsListItem
        address={address}
        walletInfo={this.props.walletInfo}
        selectedCurrency={selectedCurrency}
        balance={balance}
        tokens={tokens}
        blockchain={blockchain}
        onItemPress={this.handleItemPress}
        walletMode={walletMode}
      />
    )
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(WalletsListItemContainer)
