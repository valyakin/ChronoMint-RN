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
import { DUCK_TOKENS } from 'redux/tokens/actions'
import { selectWallet } from 'redux/wallet/actions'
import WalletsListItem, { type TWalletsListItemProps } from 'components/WalletsListItem'
import { makeGetWalletTokensAndBalanceByAddress } from 'redux/wallet/selectors'
// import { typeof MainWalletModel as TMainWalletModel } from 'models/wallet/MainWalletModel'

const makeMapStateToProps = (origState, origProps) => {
  const walletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress(origProps.blockchainTitle, origProps.address)
  const mapStateToProps = (state, ownProps) => {
    const balanceAndTokens = walletTokensAndBalanceByAddress(state, ownProps)
    const {
      prices,
      selectedCurrency,
    } = state.get(DUCK_MARKET)
    const tokenCollection = state.get(DUCK_TOKENS)

    return {
      prices,
      selectedCurrency,
      tokenCollection,
      ...balanceAndTokens,
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  selectWallet: (blockchain: string, address: string) =>
    dispatch(selectWallet(blockchain, address)),
})

class WalletsListItemContainer extends PureComponent<TWalletsListItemProps> {

  handleItemPress = (tokens: TCalculatedTokenCollection, balance): void => {

    const {
      navigator,
      wallet,
      address,
      blockchain,
    } = this.props
  
    this.props.selectWallet(
      wallet,
      address,
      blockchain,
    )

    navigator.push({
      screen: 'Wallet',
      passProps: {
        wallet: wallet,
        address: address,
        balance: balance,
      },
    })
  }

  render () {
    const {
      address,
      navigator,
      blockchain,
    } = this.props

    return (
      <WalletsListItem
        address={address}
        blockchain={blockchain}
        navigator={navigator}
        onItemPress={this.handleItemPress}
      />
    )
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(WalletsListItemContainer)
