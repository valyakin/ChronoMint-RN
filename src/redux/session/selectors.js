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
        // console.log(addrJsData)
        if (addrJsData.address) {
          const walletId = addrJsData.id
          const walletAddress = addrJsData.address
          // wallet.item.address may be equal to null (like BTG in Rinkeby/Infura)
          if (walletAddress) {
            walletSections[walletId] = {
              id: walletId,
              address: walletAddress,
              title: [walletId, 'Wallet'].join(' '),
              currency: 'USD', // FIXME: hardcoded
              balance: 0,
              tokens: [],
            }
          }
        }
      })
    }

    preapareDataObject()

    balances.items().map( (balance: BalanceModel) => {
      const balanceSymbol: string = balance.symbol()
      const balanceToken: TokenModel = tokens.item(balanceSymbol)
      const balanceTokenJs = balanceToken.toJS()
      const balanceTokenBlockchain = balanceToken.blockchain()
      // const balanceAddress: AddressModel = addresses.item(balanceTokenBlockchain)
      const balanceAmount: number = balance.amount()
      // console.log('balanceSymbol:')
      // console.log(balanceSymbol)
      // console.log('balanceToken:')
      // console.log(balanceToken.toJS())
      // console.log('+balance.amount():')
      // console.log(+balance.amount())

      if (walletSections.hasOwnProperty(balanceTokenBlockchain)) {
        console.log('marketPrices.hasOwnProperty(balanceTokenJs.id)', marketPrices.hasOwnProperty(balanceTokenJs.id))
        const addAmount = (marketPrices.hasOwnProperty(balanceTokenJs.id)) ? (balanceAmount * marketPrices[balanceTokenJs.id].USD) : 0
        console.log('ADDING:', addAmount)
        console.log(marketPrices)
        walletSections[balanceTokenBlockchain].balance += addAmount
        walletSections[balanceTokenBlockchain].tokens.push({
          currency: balance.symbol(),
          balance: balanceToken.removeDecimals(balanceAmount).toNumber(),
        })
      }
    })


    console.log('Result')
    console.log(walletSections)
    // console.log(marketPrices)



// 
// 
// 
    // const collections = wallet.balances().items()
    //   .map((balance) => ({
    //     balance,
    //     token: tokens.item(balance.symbol()),
    //   }))
    //   .filter(({ token }) => {
    //     if (!token.isFetched()) {
    //       return false
    //     }
    //     let profileToken
    //     profileTokens.map((item) => {
    //       if (isTokenChecked(token, item)) {
    //         profileToken = item
    //       }
    //     })
    //     if (MANDATORY_TOKENS.includes(token.symbol())) {
    //       return true
    //     }
    //     return profileToken ? profileToken.show : !token.isOptional()
    //   })
    //   .map(({ balance }) => balance)
    //   .reduce((groupedBalances, balance) => {
    //     const tokenId: string = tokens.item(balance.id())
    //     const blockchainName: string = tokenId.blockchain()
    //     // console.log(blockchainName)
    //     groupedBalances[blockchainName] = groupedBalances[blockchainName] || []
    //     // console.log(groupedBalances)
    //     groupedBalances[blockchainName].push(balance)
    //     return groupedBalances
    //   }, Object.create(null))

    // console.log('collections:', collections)
    // return Object.keys(collections).reduce((walletSections, sectionName) => {
    //   return [
    //     ...walletSections, 
    //     {
    //       title: sectionName,
    //       data: collections[sectionName],
    //     },
    //   ]
    // }, [])
    return [
      { title: 'Bitcoin wallets', data: [
        {
          title: 'Bitcoin Wallet',
          address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
          balance: { currency: 'BTC', amount: 15.2045 },
          exchange: { currency: 'USD', amount: 121600 },
          image: 33,
          token: 'btc',
          transactions: [
            { status: 'receiving' },
          ],
        },
      ] },
      { title: 'Ethereum wallets', data: [
        {
          title: 'My Wallet',
          address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
          balance: { currency: 'USD', amount: 1000 },
          tokens: [
            { id: 'ETH', amount: 10 },
            { id: 'TIME', amount: 10 },
          ],
          mode: '2fa',
        },
        {
          title: 'My Shared Wallet',
          address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
          balance: { currency: 'USD', amount: 32020.41 },
          tokens: [
            { id: 'ETH', amount: 21 },
            { id: 'TIME', amount: 521.20 },
          ],
          transactions: [
            { status: 'receiving' },
            { status: 'receiving' },
          ],
          mode: 'shared',
        },
        {
          title: 'My Locked Wallet',
          address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
          balance: { currency: 'USD', amount: 32020.41 },
          tokens: [
            { id: 'ETH', amount: 21 },
            { id: 'TIME', amount: 10 },
            { id: 'TIME', amount: 10 },
            { id: 'TIME', amount: 10 },
          ],
          mode: 'timeLocked',
        },
      ] },
    ]
  }
)

export const getProfileTokens = () => createSelector([ getProfile, getTokens ],
  (profile, tokens) => {
    return rebuildProfileTokens(profile, tokens)
  },
)
