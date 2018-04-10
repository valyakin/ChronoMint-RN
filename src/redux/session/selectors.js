/* @flow */
import {
  createSelector,
} from 'reselect'
import { DUCK_MAIN_WALLET } from 'redux/mainWallet/actions'
import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_MULTISIG_WALLET } from 'redux/multisigWallet/actions'
import { getCurrentWallet } from 'redux/wallet/actions'
import { getTokens } from 'redux/tokens/selectors'
import { isTokenChecked } from 'models/ProfileModel'
import { MANDATORY_TOKENS } from 'dao/ERC20ManagerDAO'

import {
  DUCK_SESSION,
  rebuildProfileTokens,
} from 'redux/session/actions'

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
      const addrID: string = 'Ethereum' // Hardcoded for now (only for multisig)
      if (!sectionsObject.hasOwnProperty(addrID)) {
        sectionsObject[addrID] = {
          data: [{
            address: currentWalletAddress,
            wallet: aWallet,
          }],
        }
      } else {
        sectionsObject[addrID].data.push({
          address: currentWalletAddress,
          wallet: aWallet,
        })
      }
    })

    // Add timeLocked multisig wallets
    multisigWallets.timeLockedWallets().map( (tlWallet) => {
      const addrID = 'Ethereum' // Hardcoded for now (only for multisig)
      const currentWalletAddress: string = tlWallet.address()
      if (!sectionsObject.hasOwnProperty(addrID)) {
        sectionsObject[addrID] = {
          data: [{
            address: currentWalletAddress,
            wallet: tlWallet,
          }],
        }
      } else {
        sectionsObject[addrID].data.push({
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

export const getSectionedBalances = () => createSelector(
  [ getCurrentWallet, getTokens, getBalances, getMarketPrices ],
  (
    mainWallet,
    tokens,
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
    const getNewEmptyWallet = (address: string, title: string, balanceCurrency: string) => {

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
    const createMainWalletsSections = (mWallet) => {
      mWallet.addresses().items().map( (addr) => {
        // Get current address (it will be an address of a main wallet)
        const walletAddress: string = addr.address()
        // if wallet has no address, it means that it was not initialized (for example like BTG in Rinkeby/Infura testnet)
        if (walletAddress) {
          // Get blockchain title
          const blockChainId: string = addr.id()
          // Create new main wallet
          const newMainWallet = getNewEmptyWallet(
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
    const fillWalletsTokens =  (balances, tokens) => {
      // Lets' go through all balances
      balances.items().map( (balance) => {
        // Symbol of the current balance
        const bSymbol: string = balance.symbol()
        // Token of the current balance
        const token = tokens.item(bSymbol)
        // Blochchin name for the current token
        const currentBlockChainName: string = token.blockchain()
        // Ignoring missing wallets
        if ( result[currentBlockChainName] !== undefined ) {
          // Amount of the current balance
          const bAmount = balance.amount()
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
        const currentMainWallet = result[blockChainName]
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
    const sectionList = activeBlockchains.map( (blockchainName: string) => result[blockchainName] ) 
    return sectionList
  }
)

export const getProfileTokens = () => createSelector([ getProfile, getTokens ],
  (profile, tokens) => {
    return rebuildProfileTokens(profile, tokens)
  },
)
