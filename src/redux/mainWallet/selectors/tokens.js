/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  createSelector,
} from 'reselect'
import { filteredBalancesAndTokens } from 'redux/mainWallet/selectors/balance'
import { getPrimaryToken } from 'redux/mainWallet/selectors/utils'
import { DUCK_TOKENS } from 'redux/tokens/actions'

export const selectTokensStore = (state) =>
  state.get(DUCK_TOKENS) // TokensCollection, array of TokenModel
/**
 * Provides list of tokens and its amount
 * Output example:
 * [
 *   {
 *     AAAAA: 0
 *   },
 *   {
 *    ETH: 20
 *   }
 * ]
*/
// eslint-disable-next-line import/prefer-default-export
export const tokensAndAmountsSelector = (blockchain: string) => createSelector(
  [
    filteredBalancesAndTokens(blockchain),
  ],
  (
    balancesInfo,
  ) => {
    let o = Object.create(null)
    let result = balancesInfo
      .map( (info) => {
        const symbol = info.balance.symbol()
        const amount = info.token
          .removeDecimals(info.balance.amount())
          .toNumber()
        o[symbol] = amount
        return {
          [symbol]: amount,
        }
      })
      .sort( (a, b) => {
        const oA = Object.keys(a)[0]
        const oB = Object.keys(b)[0]
        return (oA > oB) - (oA < oB)
      })
      .toArray()

    if (!result || !result.length) {
      const primaryTokenSymbol = getPrimaryToken(blockchain)
      result = [{ [ primaryTokenSymbol ]: null }]
    }
    return result
  }
)

export const makeGetTokenSymbolListByBlockchainName = (blockchainName: string) =>
  createSelector(
    [
      selectTokensStore,
    ],
    (mainWalletTokens) =>
      mainWalletTokens
        .list()
        .filter( (token) => {
          const res = token.blockchain() === blockchainName
          return res
        })
        .map( (token) => token.symbol() )
        .toArray()
  )

export const makeGetLastBlockForBlockchain = (symbol: string) => {
  return createSelector(
    [
      selectTokensStore,
    ],
    (
      tokens,
    ) => {
      if (!symbol) {
        return null
      }
      return tokens.latestBlocks()[tokens.item(symbol).blockchain()]
    },
  )
}
