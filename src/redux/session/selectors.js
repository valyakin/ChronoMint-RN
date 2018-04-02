import { createSelector } from 'reselect'
import { isTokenChecked } from 'models/ProfileModel'
import { MANDATORY_TOKENS } from 'dao/ERC20ManagerDAO'
import { getCurrentWallet } from 'redux/wallet/actions'
import { getTokens } from 'redux/tokens/selectors'
import MainWalletModel from 'models/wallet/MainWalletModel'
import BalanceModel from 'models/tokens/BalanceModel'
import TokenModel from 'models/tokens/TokenModel'
import AddressModel from 'models/wallet/AddressModel'
import { DUCK_MAIN_WALLET } from 'redux/mainWallet/actions'
import { DUCK_MARKET } from 'redux/market/action'

import { DUCK_SESSION, rebuildProfileTokens } from './actions'

export const getProfile = (state) => {
  const { profile } = state.get(DUCK_SESSION)
  return profile
}

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

const getBalances = (state) => {
  const wallet: MainWalletModel = state.get(DUCK_MAIN_WALLET)
  return wallet.balances()
}

const getTransactions = (state) => {
  const wallet: MainWalletModel = state.get(DUCK_MAIN_WALLET)
  return wallet.transactions()
}

const getAddresses = (state) => {
  const wallet: MainWalletModel = state.get(DUCK_MAIN_WALLET)
  return wallet.addresses()
}

const getMarketPrices = (state) => {
  const { prices } = state.get(DUCK_MARKET)
  return prices
}

export const getSectionedBalances = () => createSelector(
  [ getCurrentWallet, getProfile, getTokens, getBalances, getTransactions, getAddresses, getMarketPrices ],
  (wallet, profile, tokens, balances, transactions, addresses, marketPrices) => {

    /**
     * Go through all available addresses and fill in initial structure
     * 
     * @param {MainWalletModel} wallet Wallet to display on WalletsList page
     * @returns null
     */
    const walletSections = {}
    const preapareDataObject = () => {
      addresses.items().map( (addr: AddressModel) => {
        const addrJsData = addr.toJS()
        if (addrJsData.address) {
          const walletId = addrJsData.id
          const walletAddress = addrJsData.address
          // wallet.item.address may be equal to null (like BTG in Rinkeby/Infura)
          if (walletAddress) {
            walletSections[walletId] = {
              title: [walletId, 'Wallets'].join(' '),
              data: [{
                id: walletId,
                address: walletAddress,
                balance: {
                  currency: 'USD', // FIXME: hardcoded
                  amount: 0,
                },
                tokens: [],
                mode: null,
              }],
            }
          }
        }
      })
    }

    preapareDataObject()

    balances.items().map( (balance: BalanceModel) => {
      const balanceSymbol: string = balance.symbol()
      const balanceToken: TokenModel = tokens.item(balanceSymbol)
      const balanceTokenId = balanceToken.id()
      const balanceTokenBlockchain = balanceToken.blockchain()
      const balanceAmount: number = balance.amount()

      if (walletSections.hasOwnProperty(balanceTokenBlockchain)) {
        const addAmount = (marketPrices.hasOwnProperty(balanceTokenId)) ? (balanceToken.removeDecimals(balanceAmount).toNumber() * marketPrices[balanceTokenId].USD) : 0
        walletSections[balanceTokenBlockchain].data[0].balance.amount += addAmount
        walletSections[balanceTokenBlockchain].data[0].tokens.push({
          currency: balance.symbol(),
          amount: balanceToken.removeDecimals(balanceAmount).toNumber(),
          id: balanceToken.id(),
          iconIpfsHash: balanceToken.icon() || null, // TODO: to insert default icon,
          title: [balanceTokenBlockchain, 'Wallet'].join(' '), // FIXME: where to get token's name`?
        })
      }

    })

    // Remove all sections with empty tokens' list
    Object.keys(walletSections).map( (blockchainName) => {
      if (walletSections[blockchainName].data[0].tokens && !walletSections[blockchainName].data[0].tokens.length) {
        delete(walletSections[blockchainName])
      }
    })

    return Object.keys(walletSections).map((key) => walletSections[key])
  }
)

export const getProfileTokens = () => createSelector([ getProfile, getTokens ],
  (profile, tokens) => {
    return rebuildProfileTokens(profile, tokens)
  },
)
