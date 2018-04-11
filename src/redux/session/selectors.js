/* @flow */
import {
  createSelector,
} from 'reselect'
import { DUCK_MAIN_WALLET } from 'redux/mainWallet/actions'
import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_MULTISIG_WALLET } from 'redux/multisigWallet/actions'
import {
  getCurrentWallet,
  DUCK_WALLET,
} from 'redux/wallet/actions'
import { getTokens } from 'redux/tokens/selectors'
import { isTokenChecked } from 'models/ProfileModel'
import { MANDATORY_TOKENS } from 'dao/ERC20ManagerDAO'

import {
  DUCK_SESSION,
  rebuildProfileTokens,
} from 'redux/session/actions'

import { BLOCKCHAIN_ETHEREUM } from 'dao/EthereumDAO'
 
/**
 * STORE: Get store DUCK_MAIN_WALLET = mainWallet
 * @param {*} state 
 */
export const getMainWalletStore = (state) => state.get(DUCK_MAIN_WALLET)

/**
 * STORE: Get store DUCK_MULTISIG_WALLET = multisigWallets
 * @param {*} state 
 */
export const getMultisigWalletsStore = (state) => state.get(DUCK_MULTISIG_WALLET)

/**
 * STORE: Get store DUCK_WALLET = wallet
 * @param {*} state 
 */
export const getSelectedWalletStore = (state) => state.get(DUCK_WALLET)

/**
 * STORE: Get all active multisig wallets (activeWallets)
 * @param {*} state 
 */
export const getActiveMultisigWalletsStore = (state) => getMultisigWalletsStore(state).activeWallets()

/**
 * STORE: Get all timeLocked multisig wallets (timeLockedWallets)
 * @param {*} state 
 */
export const getTimeLockedMultisigWalletsStore = (state) => getMultisigWalletsStore(state).timeLockedWallets()

/**
 * STORE: Get balances collection of the main wallet
 * @param {*} state 
 */
export const getMainWalletBalancesStore = (state) => getMainWalletStore(state).balances()

/**
 * STORE: Get balances collection of the multisig wallet
 * @param {*} state 
 */
export const getMultisigWalletBalancesStore = (state) => getMultisigWalletsStore(state).balances()

/**
 * STORE: Get tokens collection of the main wallet
 * @param {*} state 
 */
export const getMainWalletTokensStore = (state) => getMainWalletStore(state).tokens()

/**
 * STORE: Get tokens collection of the multisig wallet
 * @param {*} state 
 */
export const getMultisigWalletTokensStore = (state) => getMultisigWalletsStore(state).tokens()

/**
 * SELECTOR: get main wallet
 */
export const getMainWalletSelector = () => createSelector(
  [ getMainWalletStore ],
  (mainWallet) => mainWallet
)

export const sectionsSelector = () => createSelector(
  [
    getMainWalletStore,
    getMultisigWalletsStore,
  ],
  (
    mainWallet,
    multisigWallets,
  ) => {
    // final result will be svaed here
    const sectionsObject = {}

    // Go through mainWallet's addresses
    mainWallet.addresses().items().map( (address) => {
      const addrJS = address.toJS()
      const addrID = addrJS.id
      if (addrJS.address != null) {
        if (!sectionsObject.hasOwnProperty(addrID)) {
          sectionsObject[addrID] = {
            data: [{
              address: addrJS.address,
              wallet: mainWallet,
            }],
          }
        } else {
          sectionsObject[addrID].data.push({
            address: addrJS.address,
            wallet: mainWallet,
          })
        }
      }
    })

    // Add active multisig wallets
    multisigWallets.activeWallets().map( (aWallet) => {
      const currentWalletAddress: string = aWallet.address()
      if (!sectionsObject.hasOwnProperty(BLOCKCHAIN_ETHEREUM)) {
        sectionsObject[BLOCKCHAIN_ETHEREUM] = {
          data: [{
            address: currentWalletAddress,
            wallet: aWallet,
          }],
        }
      } else {
        sectionsObject[BLOCKCHAIN_ETHEREUM].data.push({
          address: currentWalletAddress,
          wallet: aWallet,
        })
      }
    })

    // Add timeLocked multisig wallets
    multisigWallets.timeLockedWallets().map( (tlWallet) => {
      const currentWalletAddress: string = tlWallet.address()
      if (!sectionsObject.hasOwnProperty(BLOCKCHAIN_ETHEREUM)) {
        sectionsObject[BLOCKCHAIN_ETHEREUM] = {
          data: [{
            address: currentWalletAddress,
            wallet: tlWallet,
          }],
        }
      } else {
        sectionsObject[BLOCKCHAIN_ETHEREUM].data.push({
          address: currentWalletAddress,
          wallet: tlWallet,
        })
      }
    })

    // Sort main sections and make an array
    const sortSectionsObject = (o) => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
    const sortedSections = sortSectionsObject(sectionsObject)
    const resultSections = Object.keys(sortedSections).map( (sectionName) => {
      return {
        title: sectionName,
        data: sortedSections[sectionName].data,
      }
    })

    return resultSections
  }
)

export const getProfile = (state) => {
  const { profile } = state.get(DUCK_SESSION)
  return profile
}

export const getBalances = (state) => {
  const wallet = state.get(DUCK_MAIN_WALLET)
  return wallet.balances()
}

export const getTransactions = (state) => {
  const wallet = state.get(DUCK_MAIN_WALLET)
  return wallet.transactions()
}

export const getAddresses = (state) => {
  const wallet = state.get(DUCK_MAIN_WALLET)
  return wallet.addresses()
}

export const getMultisigWallets = (state) => {
  const msWallet = state.get(DUCK_MULTISIG_WALLET)
  const result = {
    msWallet: msWallet,
    msActiveWallets: msWallet.activeWallets(),
    msTimelockedWallets: msWallet.timeLockedWallets(),
  }

  return result
}

export const getMultisigActiveWallets = (state) => {
  const msWallet = state.get(DUCK_MULTISIG_WALLET)
  return msWallet.activeWallets()
}

export const getMultisigTimeLockedWallets = (state) => {
  const msWallet = state.get(DUCK_MULTISIG_WALLET)
  return msWallet.timeLockedWallets()
}

export const getMarketPrices = (state) => {
  const {
    prices,
    selectedCurrency,
  } = state.get(DUCK_MARKET)
  return {
    prices: prices || {},
    selectedCurrency: selectedCurrency || 'USD',
  }
}

export const getMainWallet = () => createSelector(
  [ getMainWalletStore ],
  (mainWallet) => {
    return mainWallet
  }
)

export const getWTokens = () => createSelector(
  [ getTokens ],
  (tokens) => {
    return tokens
  }
)

// Permanent reference to a functor to improve selector performance
export const BALANCES_COMPARATOR_SYMBOL = (item1, item2) => {
  const s1 = item1.balance.symbol()
  const s2 = item2.balance.symbol()
  return s1 < s2 ? -1 : (s1 > s2 ? 1 : 0)
}

export const BALANCES_COMPARATOR_URGENCY = (item1, item2) => {
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

export const getVisibleBalances = (comparator = BALANCES_COMPARATOR_URGENCY) => createSelector(
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

export const getProfileTokens = () => createSelector([ getProfile, getTokens ],
  (profile, tokens) => {
    return rebuildProfileTokens(profile, tokens)
  },
)

export const getGasSliderCollection = (state) => {
  const { gasPriceMultiplier } = state.get(DUCK_SESSION)
  return gasPriceMultiplier
}

export const getGasPriceMultiplier = (blockchain) => createSelector([ getGasSliderCollection ],
  (gasSliderCollection) => {
    return gasSliderCollection && gasSliderCollection.get(blockchain) || 1
  },
)
