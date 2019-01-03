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
  }

  render () {
    const { tokens, selectedCurrency, prices } = this.props
    return (
      <TokenSelector
        tokens={tokens}
        selectedCurrency={selectedCurrency}
        prices={prices}
      />
    )
  }

}

export default connect(mapStateToProps, null)(TokenSelectorContainer)
