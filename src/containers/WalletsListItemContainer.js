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
import WalletsListItem, {
  type TWalletsListItemProps,
  // type TCalculatedTokenCollection,
} from 'components/WalletsListItem'
import { makeGetWalletTokensAndBalanceByAddress } from 'redux/wallet/selectors'
// import { typeof MainWalletModel as TMainWalletModel } from 'models/wallet/MainWalletModel'

type TWalletsListItemContainerProps = TWalletsListItemProps & {
  selectWallet(blockchain: string, address: string): void,
  navigator: any,
}

const makeMapStateToProps = (origState, origProps) => {
  const walletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress(origProps.blockchain, origProps.address)
  const mapStateToProps = (state, ownProps) => {
    const balanceAndTokens = walletTokensAndBalanceByAddress(state, ownProps)
    const {
      selectedCurrency,
    } = state.get(DUCK_MARKET)
    const tokenCollection = state.get(DUCK_TOKENS)

    return {
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
    const {
      address,
      balance,
      blockchain,
      selectedCurrency,
    } = this.props

    return (
      <WalletsListItem
        address={address}
        selectedCurrency={selectedCurrency}
        balance={balance}
        blockchain={blockchain}
        onItemPress={this.handleItemPress}
      />
    )
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(WalletsListItemContainer)
