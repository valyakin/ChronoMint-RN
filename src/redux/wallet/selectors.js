/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { createSelector } from 'reselect'
import { DUCK_MAIN_WALLET } from 'redux/mainWallet/actions'
import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_MULTISIG_WALLET } from 'redux/multisigWallet/actions'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import { getCurrentWallet, DUCK_WALLET } from 'redux/wallet/actions'
import { typeof Amount as TAmountModel } from 'models/Amount'
import { typeof BalanceModel as TBalanceModel } from 'models/tokens/BalanceModel'
import { typeof BalancesCollection as TBalancesCollection } from 'models/tokens/BalancesCollection'
import { typeof MainWalletModel as TMainWalletModel } from 'models/wallet/MainWalletModel'
import { typeof MultisigWalletModel as TMultisigWalletModel } from 'models/wallet/MultisigWalletModel'
import { typeof TokenModel as TTokenModel } from 'models/tokens/TokenModel'
import TokensCollection from 'models/tokens/TokensCollection'
import { typeof TxModel as TTxModel } from 'models/TxModel'

/**
|--------------------------------------------------
| CUSTOM FLOW TYPES
|--------------------------------------------------
*/

type TSelectedWallet = {
  address: string,
  blockchain: string,
  isMultisig: ?boolean,
}

/**
|--------------------------------------------------
| SIMPLE STATE GETTERS (DUCKS)
|--------------------------------------------------
*/

const getSelectedWalletStore = (state: any): TSelectedWallet =>
  state.get(DUCK_WALLET)

const getMainWalletStore = (state: any): TMainWalletModel =>
  state.get(DUCK_MAIN_WALLET)

const getMultisigWalletStore = (state: any): TMultisigWalletModel =>
  state.get(DUCK_MULTISIG_WALLET)

const getMarketPricesSelectedCurrencyStore = (state: any): string =>
  state.get(DUCK_MARKET).selectedCurrency

const getTokensStore = (state: any): TTokensCollection =>
  state.get(DUCK_TOKENS)

/**
|--------------------------------------------------
| MODELS BASED SELECTORS
|--------------------------------------------------
*/

const modelMainWalletBalances = createSelector(
  getMainWalletStore,
  (mainWallet: TMainWalletModel): TBalancesCollection => mainWallet.balances()
)

const modelMultisigWalletBalances = createSelector(
  getMultisigWalletStore,
  (multisigWallet: TMultisigWalletModel): TBalancesCollection => multisigWallet.balances()
)

/**
|--------------------------------------------------
| MODELS BASED SELECTIOR CREATORS (SELECTOR FACTORIES WITH PARAMETERS)
|--------------------------------------------------
*/

export const makeSelectorMainWalletBalanceBySymbol = (symbol: string): TBalanaceModel =>
  createSelector(
    selectMainWalletBalances,
    (mainWalletBalances: TBalancesCollection): TBalanceModel => mainWalletBalances.item(symbol)
  )

export const makeSelectorMultisigWalletBalanceBySymbolAndAddress = (symbol: string, address: string) =>
  createSelector(
    [ getMultisigWalletStore ],
    (mainWallet: TMainWalletModel): TBalanceModel => mainWallet
      .balances()
      .item(symbol)
  )







/**
|--------------------------------------------------
| OLD STUFF
|--------------------------------------------------
*/

// export const getMainWalletBalance = (symbol: string) => createSelector(
//   [ getMainWallet ],
//   (mainWallet) => mainWallet.balances().item(symbol)
// )

// export const getCurrentWalletBalance = (symbol: string) => createSelector(
//   [ getCurrentWallet ],
//   (currentWallet) => currentWallet.balances().item(symbol)
// )

// export const selectMainWalletBalancesListStore = (state) =>
//   state.get(DUCK_MAIN_WALLET).balances().list() // BalancesCollection, array of BalanceModel

// export const selectTokensStore = (state) =>
//   state.get(DUCK_TOKENS) // TokensCollection, array of TokenModel

// export const selectMainWalletAddressesListStore = (state) =>
//   state.get(DUCK_MAIN_WALLET).addresses().list() // This is an instance of MainWalletModel

// export const selectMainWalletTransactionsListStore = (state) => {
//   return state.get(DUCK_MAIN_WALLET).transactions().list() // This is an instance of MainWalletModel
// }

// export const selectMarketPricesListStore = (state) =>
//   state.get(DUCK_MARKET).prices

// export const selectMarketPricesSelectedCurrencyStore = (state) =>
//   state.get(DUCK_MARKET).selectedCurrency




// export const selectMainWalletTransactionsStore = (state) => {
//   const status = state.get(DUCK_MAIN_WALLET).transactions().toJS()
//   return {
//     isFailed: status.isFailed,
//     isFetched: status.isFetched,
//     isFetching: status.isFetching,
//     isInited: status.isInited,
//     isPending: status.isPending,
//     isSelected: status.isSelected,
//   }
// }
// /**
//  * WALLET SECTIONS
//  * 
//  *  Usage example:
//  * 
//  * 
//  * const getSectionedWallets = makeGetSectionedWallets()
//  *   const mapStateToProps = (state, props) => {
//  *     const makeMapStateToProps = () => {
//  *     return {
//  *       walletsSections: getSectionedWallets(state, props),
//  *     }
//  *   }
//  *  return mapStateToProps
//  * }
//  * 
//  * @connect(makeMapStateToProps)
//  * export default class AnyComponent extends PureComponent {
//  */

// /**
//  * This is memoized selector. Produce the list of blockchain sections and wallets
//  * 
//  * @return { [{title: string, data: string | string[]}] }
//  *         Returns list of sections for the ReactNative SectionList.
//  */
// export const getMainWalletSections = createSelector(
//   [
//     selectMainWalletAddressesListStore,
//   ],
//   (mainWalletAddressesList) => {
//     return mainWalletAddressesList
//       .filter( (address) => address.address() !== null ) // We do not need wallets with null address (e.g. BTG in Rinkeby/Infura)
//       .reduce( (accumulator, addressModel, blockchain) => {
//         const address = addressModel.address() // AddressModel.address() returns string with wallet's address
//         accumulator.push({
//           // data must contains an array (requirement of SectionList component in React Native, sorry)
//           data: [address],
//           title: blockchain,
//         })
//         return accumulator
//       }, [] )
//       .sort( ({ title: a }, { title: b }) => (a > b) - (a < b) ) // sort by blocakchains titles
//   }
// )

// /**
//  * This is the factory for selector
//  * It may be used in different components and each of them will have its own memoized copy
//  * 
//  * @return { [{title: string, data: string | string[]}] }
//  *         Returns list of sections for the ReactNative SectionList.
//  */
// export const makeGetSectionedWallets = () => createSelector(
//   [
//     getMainWalletSections,
//   ],
//   (mainWalletSections) => mainWalletSections
// )

// /**
//  * TOKENS AND BALANCE BY ADDRESS
//  * 
//  * Usage example:
//  * const makeMapStateToProps = (origState, origProps) => {
//  *  const getWalletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress()
//  *  const mapStateToProps = (state, ownProps) => {
//  *     const walletTokensAndBalanceData = getWalletTokensAndBalanceByAddress(state, ownProps)
//  *     return {
//  *       walletTokensAndBalance: walletTokensAndBalanceData,
//  *     }
//  *   }
//  *   return mapStateToProps
//  * }
//  * 
//  * @connect(makeMapStateToProps)
//  * export default class AnyComponent extends PureComponent<WalletPanelProps> {
//  * 
//  * NOTE: component AnyComnnect MUST have props walletAddress: string & blockchain: string
//  * Both props are required, because we may have same wallet addresses in "Bitcoin" and "Bitcoin Cash" blockchains
//  */

// /**
//  * This is the factory for selector
//  * It may be used in different components and each of them will have its own memoized copy
//  * 
//  * @return { { balance: number, tokens: [ {ETH: number } ] } }
//  *         Returns list of sections for the ReactNative SectionList.
//  */
// export const makeGetWalletTokensAndBalanceByAddress = (blockchain: string, address?: string) => {
//   return createSelector(
//     [
//       getMainWalletSections,
//       selectMainWalletTransactionsListStore,
//       selectMainWalletAddressesListStore,
//       selectMainWalletBalancesListStore,
//       selectTokensStore,
//       selectMarketPricesListStore,
//       selectMarketPricesSelectedCurrencyStore,
//     ],
//     (
//       addressesAndBlockchains,
//       mainWalletTransactionsList,
//       mainWalletAddressesList,
//       mainWalletBalances,
//       mainWalletTokens,
//       prices,
//       selectedCurrency,
//     ) => {

//       /**
//        * Internal utility
//        * @private
//        */
//       const convertAmountToNumber = (symbol, amount) =>
//         mainWalletTokens
//           .item(symbol)
//           .removeDecimals(amount)
//           .toNumber()

//       const walletTokensAndBalanceByAddress = mainWalletBalances // BalancesCollection, array of BalanceModel
//         .filter( (balanceItem) => {
//           const bSymbol = balanceItem.symbol()
//           const bToken = mainWalletTokens.item(bSymbol)
//           return bToken.blockchain() === blockchain
//         })
//         .map( (balance) => {
//           const bAmount = balance.amount()
//           const bSymbol = balance.symbol()
//           const tAmount = convertAmountToNumber(bSymbol, bAmount)
//           let tokenAmountKeyValuePair = {}
//           tokenAmountKeyValuePair[bSymbol] = tAmount
//           return {
//             symbol: bSymbol,
//             amount: tAmount,
//           }
//         })

//       const arrWalletTokensAndBalanceByAddress = [...walletTokensAndBalanceByAddress.values()]
//       const result = arrWalletTokensAndBalanceByAddress
//         .reduce( (accumulator, tokenKeyValuePair) => {
//           const { amount, symbol } = tokenKeyValuePair
//           const tokenPrice = prices[ symbol ] && prices[ symbol ][ selectedCurrency ] || null
//           if (tokenPrice && amount > 0) {
//             accumulator.balance += ( amount * tokenPrice )
//           }
//           accumulator.tokens.push({ 
//             [ symbol ]: {
//               amount: amount,
//               balance: amount * (tokenPrice || 0),
//             },
//           })
//           accumulator.tokens = accumulator.tokens.sort( (a, b) => {
//             const oA = Object.keys(a)[0]
//             const oB = Object.keys(b)[0]
//             return (oA > oB) - (oA < oB)
//           } ) // sort by blocakchains titles (TODO: it does not effective to resort whole array each time in reduce, need better place...)
//           return accumulator
//         }, {
//           balance: 0,
//           tokens: [],
//         })

//       // Let's add an address of Main Wallet into final result
//       const currentWallet = addressesAndBlockchains
//         .find((mainWalletAddrAndChain) => {
//           return mainWalletAddrAndChain.title === blockchain
//         })
//       result.address = currentWallet && currentWallet.data && currentWallet.data[0]

//       return result
//     }
//   )
// }

// export const getWalletTransactions = createSelector(
//   [
//     selectMainWalletTransactionsListStore,
//   ],
//   (mainWalletTransactionsList) => {
//     return mainWalletTransactionsList
//   }
// )

// export const makeGetMainWalletTransactionsByBlockchainName = (
//   requiredBlocakchinName: string,
//   currentWalletAddress: string,
// ) => {
//   return createSelector(
//     [
//       getMainWallet,
//       selectTokensStore,
//       selectMainWalletTransactionsListStore,
//       selectTokensStore,
//     ],
//     (
//       mainWallet,
//       mainWalletTokens,
//       mainWalletTransactions, // Immutable Map 
//       mainWalletTokensCollection, // TokensCollection
//     ) => {
//       /**
//        * Internal utility
//        * @private
//        */
//       const convertAmountToNumber = (symbol, amount) =>
//         mainWalletTokens
//           .item(symbol)
//           .removeDecimals(amount)
//           .toNumber()

//       const getTokenSymbolListByBlockchainName = (blockchainName: string) =>
//         mainWalletTokensCollection
//           .list()
//           .filter( (token) => {
//             const res = token.blockchain() === blockchainName
//             return res
//           })
//           .map( (token) => token.symbol() )
//           .toArray()

//       const requiredTokenList = getTokenSymbolListByBlockchainName(requiredBlocakchinName)
//       const result = mainWallet
//         .transactions()
//         .list()
//         .filter( (txModel: TTxModel) => {
//           const isNeedIt = requiredTokenList.includes(txModel.symbol()) // if sumbol of a transaction in range of current blockchain
//             && [txModel.to(), txModel.from()].includes(currentWalletAddress) // if to or from address of a transaction contians curent wallet's address
//           return isNeedIt
//         })
//         .map( (txModel: TTxModel) => {
//           const isSendTransaction = txModel.to().toLowerCase() === currentWalletAddress.toLowerCase()
//           const toAddress = txModel.to()
//           const fromAddress = txModel.from()
//           const transactionType = isSendTransaction
//             ? 'sending'
//             : 'receiving'
//           const transactionAddress = isSendTransaction
//             ? toAddress
//             : fromAddress
//           return {
//             type: transactionType,
//             address: transactionAddress,
//             amount: convertAmountToNumber(txModel.symbol(), txModel.value()),
//             symbol: txModel.symbol(),
//             confirmations: 1,
//             txDate: txModel.get('time'),
//           }
//         })
//         .toArray()

//       return result
//     })
// }

// export const getSelectedWalletBalanceInSelectedCurrency = createSelector(
//   [
//     getSelectedWalletStore,
//     getMainWalletSections,
//     selectMainWalletTransactionsListStore,
//     selectMainWalletAddressesListStore,
//     selectMainWalletBalancesListStore,
//     selectTokensStore,
//     selectMarketPricesListStore,
//     selectMarketPricesSelectedCurrencyStore,
//   ],
//   (
//     selectedWallet,
//     addressesAndBlockchains,
//     mainWalletTransactionsList,
//     mainWalletAddressesList,
//     mainWalletBalances: TBalancesCollection,
//     mainWalletTokens,
//     prices,
//     selectedCurrency,
//   ) => {
//     const { blockchain, address }: { blockchain: ?string, address: ?string } = selectedWallet

//     const convertAmountToNumber = (symbol: string, amount: TAmountModel) =>
//       mainWalletTokens
//         .item(symbol)
//         .removeDecimals(amount)
//         .toNumber()

//     const walletTokensAndBalanceByAddress = mainWalletBalances // BalancesCollection, array of BalanceModel
//       // filtering main wallets balances by blockhain title
//       .filter( (balanceItem: TBalanceModel) => {
//         const bSymbol: string = balanceItem.symbol()
//         const bToken: TTokenModel = mainWalletTokens.item(bSymbol)
//         return bToken.blockchain() === blockchain
//       })
//       // simplify format
//       .map( (balanceItem: TBalanceModel) => {
//         const bAmount: TAmountModel = balanceItem.amount()
//         const bSymbol: string = balanceItem.symbol()
//         const tAmount: number = convertAmountToNumber(bSymbol, bAmount)
//         let tokenAmountKeyValuePair = {}
//         tokenAmountKeyValuePair[bSymbol] = tAmount
//         return {
//           symbol: bSymbol,
//           amount: tAmount,
//         }
//       })

//     const arrWalletTokensAndBalanceByAddress = [...walletTokensAndBalanceByAddress.values()]
//     const balance: number = arrWalletTokensAndBalanceByAddress
//       .reduce( (accumulator, tokenKeyValuePair) => {
//         const { amount, symbol } = tokenKeyValuePair
//         const tokenPrice = prices[ symbol ] && prices[ symbol ][ selectedCurrency ] || null
//         if (tokenPrice && amount > 0) {
//           // eslint-disable-next-line no-param-reassign
//           accumulator += ( amount * tokenPrice )
//         }
//         return accumulator
//       }, 0)

//     return balance && balance.toFixed(2) || 0
//   }
// )

// export const getWalletInfoByBockchainAndAddress = createSelector(
//   [
//     selectMainWalletTransactionsListStore,
//   ],
//   (
//     mainWalletTransactionsList
//   ) => {
//     return mainWalletTransactionsList
//   }

// export const makeGetWalletInfoByBockchainAndAddress = (blockchain: string, address: string) => {

// }
