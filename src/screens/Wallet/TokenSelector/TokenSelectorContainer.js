/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentTokensArray } from '@chronobank/ethereum/redux/selectors'
import { selectMarketPrices, selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import TokenSelector from './TokenSelector'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    masterWalletAddress,
    selectedCurrency: selectCurrentCurrency(state),
    prices: selectMarketPrices(state),
    tokens: getCurrentTokensArray(masterWalletAddress)(state),
  }
}


class TokenSelectorContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    tokens: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    selectedCurrency: PropTypes.string,
    prices: PropTypes.shape({}),
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  handleSelectToken = (token) => {
    const { navigate } = this.props.navigation
    const params = {
      BLOCKCHAIN_ETHEREUM,
      token,
    }

    navigate('SendEth', params)
  }

  render () {
    const { tokens, selectedCurrency, prices } = this.props
    return (
      <TokenSelector
        tokens={tokens}
        selectedCurrency={selectedCurrency}
        onSelectToken={this.handleSelectToken}
        prices={prices}
      />
    )
  }
}

export default connect(mapStateToProps, null)(TokenSelectorContainer)
