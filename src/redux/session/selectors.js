/* @flow */
import {
  createSelector,
  createStructuredSelector,
} from 'reselect'
import { DUCK_MAIN_WALLET } from '../../../mint/src/redux/mainWallet/actions'
import { DUCK_MARKET } from '../../../mint/src/redux/market/action'
import { DUCK_MULTISIG_WALLET } from '../../../mint/src/redux/multisigWallet/actions'
import { getCurrentWallet } from '../../../mint/src/redux/wallet/actions'
import { getTokens } from '../../../mint/src/redux/tokens/selectors'
import { MANDATORY_TOKENS } from '../../../mint/src/dao/ERC20ManagerDAO'
import { isTokenChecked } from '../../../mint/src/models/ProfileModel'

// import MainWalletModel from '../../../mint/src/models/wallet/MainWalletModel'
// import MultisigWalletModel from '../../../mint/src/models/wallet/MultisigWalletModel'

import {
  DUCK_SESSION,
  rebuildProfileTokens,
} from './actions'

import {
  type TAddressModel,
  type TAmountModel,
  type TBalanceModel,
  type TBalancesCollection,
  type TMainWalletModel,
  type TMultisigWalletModel,
  type TMultisigWalletsModelsSet,
  type TTokenModel,
  type TTokensCollection,
  type TWallet,
  type TWalletSection,
  type TWalletSectionList,
} from '../../types'

export const getProfile = (state) => {
  const { profile } = state.get(DUCK_SESSION)
  return profile
}

export const getBalances = (state) => {
  const wallet: TMainWalletModel = state.get(DUCK_MAIN_WALLET)
  return wallet.balances()
}

export const getTransactions = (state) => {
  const wallet: TMainWalletModel = state.get(DUCK_MAIN_WALLET)
  return wallet.transactions()
}

export const getAddresses = (state): TMultisigWalletsModelsSet => {
  const wallet: TMainWalletModel = state.get(DUCK_MAIN_WALLET)
  return wallet.addresses()
}

export const getMultisigWallets = (state) => {
  const msWallet: TMultisigWalletModel = state.get(DUCK_MULTISIG_WALLET)
  const result: TMultisigWalletsModelsSet = {
    msWallet: msWallet,
    msActiveWallets: msWallet.activeWallets(),
    msTimelockedWallets: msWallet.timeLockedWallets(),
  }

  return result
}

export const getMultisigActiveWallets = (state) => {
  const msWallet: TMultisigWalletModel = state.get(DUCK_MULTISIG_WALLET)
  return msWallet.activeWallets()
}

export const getMultisigTimeLockedWallets = (state) => {
  const msWallet: TMultisigWalletModel = state.get(DUCK_MULTISIG_WALLET)
  return msWallet.timeLockedWallets()
}

export const getMarketPrices = (state) => {
  const {
    prices,
    selectedCurrency,
  } = state.get(DUCK_MARKET)
  return {
    prices,
    selectedCurrency,
  }
}

export const getMainWalletStore = (state) => {
  return state.get(DUCK_MAIN_WALLET)
}

export const getMainWallet = () => createSelector(
  [ getMainWalletStore ],
  (mainWallet: TMainWalletModel) => {
    return mainWallet
  }
)

// export const getGasSliderCollection = (state) => {
//   const { gasPriceMultiplier } = state.get(DUCK_SESSION)
//   return gasPriceMultiplier
// }

// export const getGasPriceMultiplier = (blockchain: string) => createSelector(
//   [ getGasSliderCollection ],
//   (gasSliderCollection) => {
//     return gasSliderCollection.get(blockchain) || 1
//   },
// )

export const getWTokens = () => createSelector(
  [ getTokens ],
  (tokens: TTokensCollection) => {
    return tokens
  }
)

type TComparator = (item1: TItemToCompare, item2: TItemToCompare) => number
type TItemToCompare = {
  balance: TBalanceModel,
  token: TTokenModel,
}
// Permanent reference to a functor to improve selector performance
export const BALANCES_COMPARATOR_SYMBOL: TComparator = (item1: TItemToCompare, item2: TItemToCompare) => {
  const s1 = item1.balance.symbol()
  const s2 = item2.balance.symbol()
  return s1 < s2 ? -1 : (s1 > s2 ? 1 : 0)
}

export const BALANCES_COMPARATOR_URGENCY: TComparator = (item1: TItemToCompare, item2: TItemToCompare) => {
  const m1 = MANDATORY_TOKENS.includes(item1.token.symbol())
  const m2 = MANDATORY_TOKENS.includes(item2.token.symbol())
  const urgency = m2 - m1
  if (urgency !== 0) {
    return urgency
  }
  const s1 = item1.balance.symbol()
  const s2 = item2.balance.symbol()
  return s1 < s2 ? -1 : (s1 > s2 ? 1 : 0)
}

export const getVisibleBalances = (comparator: TComparator = BALANCES_COMPARATOR_URGENCY) => createSelector(
  [ getCurrentWallet, getProfile, getTokens ],
  (wallet, profile, tokens) => {
    const profileTokens = rebuildProfileTokens(profile, tokens)
    return wallet.balances().items()
      .map((balance) => ({
        balance,
        token: tokens.item(balance.symbol()),
      }))
      .filter(({ token }) => {
        if (!token.isFetched()) {
          return false
        }
        let profileToken
        profileTokens.map((item) => {
          if (isTokenChecked(token, item)) {
            profileToken = item
          }
        })
        if (MANDATORY_TOKENS.includes(token.symbol())) {
          return true
        }
        return profileToken ? profileToken.show : !token.isOptional()
      })
      .sort(comparator)
      .map(({ balance }) => balance)
  },
)

export const getSectionedBalances = () => createStructuredSelector(
  [ getCurrentWallet, getMultisigWallets, getTokens, getBalances, getMarketPrices ],
  (
    mainWallet: TMainWalletModel,
    {
      msWallet,
      msActiveWallets,
      msTimelockedWallets,
    }: TMultisigWalletsModelsSet,
    tokens: TTokensCollection,
    balances,
    {
      prices,
      selectedCurrency,
    }
  ) => {

    // This is final result object. Sections array to be created based on this result.
    const result: Object = Object.create(null)

    /**
     * Object to reresent a main wallet
     * @param {string} address - Wallet's address
     * @param {string} title - Wallet's title
     */
    const getNewEmptyWallet = (address: string, title: string, balanceCurrency: string): TWallet => {

      return  {
        address: address,
        balance: {
          amount: 0,
          currency: balanceCurrency,
        },
        // exchange: emptyExcahnge,
        // image: 0,
        // mode: null,
        title: title,
        tokens: [],
        // transactions: [],
      }
    }

    /**
     * Create all available main wallets in TSectionList format
     * @param {TMainWalletModel} mwAddresses - all addresses of a main wallet
     */
    const createMainWalletsSections = (mWallet: TMainWalletModel) => {
      mWallet.addresses().items().map( (addr: TAddressModel) => {
        // Get current address (it will be an address of a main wallet)
        const walletAddress: string = addr.address()
        // if wallet has no address, it means that it was not initialized (for example like BTG in Rinkeby/Infura testnet)
        if (walletAddress) {
          // Get blockchain title
          const blockChainId: string = addr.id()
          // Create new main wallet
          const newMainWallet: TWallet = getNewEmptyWallet(
            walletAddress,
            ['My', blockChainId, 'Wallet'].join(' '),
            selectedCurrency,
          )
          // Push newly cretae wallet into data filed of appropriate section, selected by blockchain title
          result[blockChainId] = {
            title: [blockChainId, 'Wallets'].join(' '),
            data: [newMainWallet],
          }
        }
      })
    }

    /**
     * Distribute tokens between main wallets (by blockchain names)
     * @param {TBalancesCollection} balances all available balances from global store
     * @param {TTokensCollection} tokens all available tokens from global store
     */
    const fillWalletsTokens =  (balances: TBalancesCollection, tokens: TTokensCollection) => {
      // Lets' go through all balances
      balances.items().map( (balance: TBalanceModel) => {
        // Symbol of the current balance
        const bSymbol: string = balance.symbol()
        // Token of the current balance
        const token: TTokenModel = tokens.item(bSymbol)
        // Blochchin name for the current token
        const currentBlockChainName: string = token.blockchain()
        // Ignoring missing wallets
        if ( result[currentBlockChainName] !== undefined ) {
          // Amount of the current balance
          const bAmount: TAmountModel = balance.amount()
          // Token's symbol
          const tSymbol: string = token.symbol()
          result[currentBlockChainName].data[0].tokens.push({
            id: token.id(),
            amount: tokens.item(tSymbol).removeDecimals(bAmount).toNumber(),
          })
        }
      })
    }

    /**
     * Loop through all available tokens in main wallets, get its' proces and calculate main wallet's balance.amount
     */
    const calculateWalletBalanceInUSD = (): void => {
      // Get all blockchain names
      const activeBlockchains: string[] = Object.keys(result)
      activeBlockchains.map( (blockChainName: string) => {
        const currentMainWallet: TWalletSection = result[blockChainName]
        const balanceReducer = (walletBalance, token) => {
          const tokenId: string = token.id
          const tokenPrice: number | null = prices[ tokenId ] && prices[ tokenId ][ selectedCurrency ] || null
          return tokenPrice ?
            (tokenPrice * token.amount) + walletBalance :
            walletBalance
        }
        let balanceResult: number = (currentMainWallet.data[0].tokens && currentMainWallet.data[0].tokens.length) ?
          currentMainWallet.data[0].tokens.reduce(balanceReducer, 0) :
          0
        currentMainWallet.data[0].balance.amount = Math.round( balanceResult * 1e2 ) / 1e2 // This is like toFixed(2) but returns number
      })
    }

    createMainWalletsSections(mainWallet)
    fillWalletsTokens(balances, tokens)
    calculateWalletBalanceInUSD()

    // Return sections' list (array)
    const activeBlockchains: string[] = Object.keys(result).sort() 
    const sectionList: TWalletSectionList = activeBlockchains.map( (blockchainName: string) => result[blockchainName] ) 
    return sectionList
  }
)

export const getProfileTokens = () => createSelector([ getProfile, getTokens ],
  (profile, tokens) => {
    return rebuildProfileTokens(profile, tokens)
  },
)
