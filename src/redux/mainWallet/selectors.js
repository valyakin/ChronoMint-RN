/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect'
import {
  BLOCKCHAIN_BITCOIN_CASH,
  BLOCKCHAIN_BITCOIN_GOLD,
  BLOCKCHAIN_BITCOIN,
  BLOCKCHAIN_LITECOIN,
} from 'login/network/BitcoinProvider'
import { DUCK_MAIN_WALLET } from 'redux/mainWallet/actions'
import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import type AddressModel from 'models/wallet/AddressModel'
import type BalanceModel from 'models/tokens/BalanceModel'
import type MainWalletModel from 'models/wallet/MainWalletModel'
import type TokensCollection from 'models/tokens/TokensCollection'
import { BLOCKCHAIN_ETHEREUM } from 'dao/EthereumDAO'

const BLOCKCHAIN_NEM = 'NEM' // TODO: replace it to "import { BLOCKCHAIN_NEM } from 'dao/NemDAO" after ChronoMint depency upgrade

//#region DUCKS GETTERS

const mainWalletStore = (state: any): MainWalletModel =>
  state.get(DUCK_MAIN_WALLET)

const getMainWalletBalancesListStore = (state: any): BalanceModel[] =>
  state.get(DUCK_MAIN_WALLET).balances().list()

const selectedCurrencyStore = (state: any): string =>
  state.get(DUCK_MARKET).selectedCurrency

const pricesStore = (state: any) =>
  state.get(DUCK_MARKET).prices

const tokensStore = (state: any): TokensCollection =>
  state.get(DUCK_TOKENS)

//#endregion

export const getTxsFromDuck = (state: any) => {
  const wallet = state.get(DUCK_MAIN_WALLET)
  return wallet.transactions()
}

export const getTxs = () => createSelector(
  [ getTxsFromDuck ],
  (txs) => {
    return txs
  },
)

//#region INTERNAL NOT EXPORTED SELECTORS

const selectMainWalletsList = createSelector(
  [
    mainWalletStore,
  ],
  (mainWallet: MainWalletModel): any[] =>
    mainWallet
      .addresses()
      .items()
      .filter( (addressModel: AddressModel) =>
        addressModel.id() && addressModel.address()
      )
      .map( (addressModel: AddressModel) => {
        const blockchain: string = addressModel.id()
        const address: ?string = addressModel.address()
        const jsWallet = Object.create(null)
        jsWallet['address'] = address
        jsWallet['blockchain'] = blockchain
        return jsWallet
      })
      .sort( ({ blockchain: a }, { blockchain: b }) =>
        (a > b) - (a < b)
      )
)

const createSectionsSelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => {
    if (a.length !== b.length) {
      return false
    }
    let compareResult = true
    for (let i = 0; i++; i <= a.length) {
      if (a[i].blockchain !== b[i].blockchain || a[i].address !== b[i].address) {
        compareResult = false
        break
      }
    }
    return compareResult
  }
)

const filteredBalances = (blockchain: string) => createSelector(
  [
    getMainWalletBalancesListStore,
    tokensStore,
  ],
  (
    balances,
    tokens,
  ) => {
    return balances
      .filter( (balance) => {
        const symbol = balance.symbol()
        const token = symbol && tokens.item(symbol)
        return token && token.blockchain() === blockchain
      })
  }
)

const filteredBalancesAndTokens = (blockchain: string) => createSelector(
  [
    filteredBalances(blockchain),
    tokensStore,
  ],
  (
    balances,
    tokens,
  ) => {
    return balances
      .map( (balance) => {
        return {
          balance: balance,
          token: tokens.item(balance.symbol()),
        }
      })
  }
)

const balanceCalculator = (blockchain: string) => createSelector(
  [
    tokensAndAmountsSelector(blockchain),
    selectedCurrencyStore,
    pricesStore,
  ],
  (
    balances,
    selectedCurrency,
    priceList,
  ) => {
    return balances
      .reduce( (accumulator, tokenBalance) => {
        if (tokenBalance) {
          const symbol = Object.keys(tokenBalance)[0]
          const balance = Object.values(tokenBalance)[0]
          const tokenPrice = priceList[ symbol ]
            && priceList[ symbol ][ selectedCurrency ]
            || null
          accumulator += ( ( balance || 0 ) * ( tokenPrice || 0 ))
        }
        return accumulator
      }, 0)
  }
)

//#endregion

/**
 * Provides list of wallets sections
 * Output example:
 * [
 *   {
 *     blockchain: 'Bitcoin',
 *     address: ''
 *   },
 *   {
 *     blockchain: 'Ethereum',
 *     address: ''
 *   }
 * ]
*/
export const sectionsSelector = createSectionsSelector(
  [
    selectMainWalletsList,
  ],
  (
    mainWalletsList,
  ) => {

    const sectionsObject = []

    mainWalletsList
      .forEach( (mainWallet) => {
        const { address, blockchain } = mainWallet
        sectionsObject.push({
          title: blockchain,
          data: [{
            address: address,
            blockchain,
          }],
        })
      })
    return sectionsObject
  }
)

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
export const tokensAndAmountsSelector = (blockchain: string) => createSelector(
  [
    filteredBalancesAndTokens(blockchain),
  ],
  (
    balancesInfo,
  ) => {
    let result = balancesInfo
      .map( (info) => {
        const symbol = info.balance.symbol()
        return {
          [symbol]: info.token
            .removeDecimals(info.balance.amount()).toNumber(),
        }
      })
      .sort( (a, b) => {
        const oA = Object.keys(a)[0]
        const oB = Object.keys(b)[0]
        return (oA > oB) - (oA < oB)
      })
      .toArray()

    if (!result || !result.length) {
      switch (blockchain) {
        case BLOCKCHAIN_BITCOIN_CASH: {
          result = [{ 'BCC': null }]
          break
        }
        case BLOCKCHAIN_BITCOIN_GOLD: {
          result = [{ 'BTG': null }]
          break
        }
        case BLOCKCHAIN_BITCOIN: {
          result = [{ 'BTC': null }]
          break
        }
        case BLOCKCHAIN_LITECOIN: {
          result = [{ 'LTC': null }]
          break
        }
        case BLOCKCHAIN_NEM: {
          result = [{ 'XEM': null }, { 'XMIN': null }]
          break
        }
        case BLOCKCHAIN_ETHEREUM: {
          result = [{ 'ETH': null }]
          break
        }
      }
    }
    return result
  }
)

/**
 * Provides balance of selected main wallet
 * Output example:
 * 33.234234
*/
export const walletBalanceSelector = (blockchain: string) => createSelector(
  [
    balanceCalculator(blockchain),
  ],
  (
    calculatedBalance,
  ) => {
    return calculatedBalance
  }
)

