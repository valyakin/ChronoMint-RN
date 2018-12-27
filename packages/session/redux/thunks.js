/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'
import {
  login,
  logout,
} from './actions'
import {
  startMarket,
  stopMarket,
} from '@chronobank/market/middleware/thunks'
import {
  rmqConnect,
  rmqDisconnect,
  rmqSubscribe,
} from '@chronobank/network/redux/thunks'
import { marketAddToken } from '@chronobank/market/redux/thunks'
import { getBitcoinWalletsList } from '@chronobank/bitcoin/redux/selectors'
import { getBalance } from '@chronobank/ethereum/middleware/thunks'
import { updateEthereumBalance } from '@chronobank/ethereum/redux/thunks'
import * as apiBTC from '@chronobank/bitcoin/service/api'
import { updateBitcoinBalance, updateBitcoinTxHistory } from '@chronobank/bitcoin/redux/thunks'
import { parseBitcoinBalanceData, convertSatoshiToBTC } from '@chronobank/bitcoin/utils/amount'
import * as EthAmountUtils from '@chronobank/ethereum/utils/amount'

export const loginThunk = (ethAddress, privateKey) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    if (!ethAddress || !privateKey) {
      return reject('0003: No ETH address or privateKey provided!')
    }

    try {
      dispatch(startMarket())
      dispatch(marketAddToken('BTC'))
      dispatch(marketAddToken('ETH'))
      dispatch(rmqConnect())
        .then(() => {
          dispatch(getBalance(ethAddress))
            .then((amount) => {
              const balance = EthAmountUtils.amountToBalance(amount)
              updateEthereumBalance({ tokenSymbol: 'ETH', address: ethAddress, balance, amount })
            })
            .catch((error) => {
              return reject('Requiesting ETH balance error', error)
            })
          dispatch(createBitcoinWallet(privateKey, ethAddress))
            .then(() => {
              const BTCwalletsList = getBitcoinWalletsList(ethAddress)(getState())
              BTCwalletsList.forEach((address) => {
                dispatch(apiBTC.requestBitcoinSubscribeWalletByAddress(address))
                  .then(() => {
                    dispatch(apiBTC.requestBitcoinBalanceByAddress(address))
                      .then((balance) => {
                        dispatch(updateBitcoinBalance({
                          address,
                          masterWalletAddress: ethAddress,
                          balance: parseBitcoinBalanceData(balance),
                          amount: balance.payload.data.confirmations0.amount || balance.payload.data.confirmations6.amount,
                        }))
                      })
                      .catch((error) => {
                        return reject('Update BTC balance HTTP ERROR:', error)
                      })
                  })
                  .catch((error) => {
                    return reject('HTTP response ERROR:', error)
                  })
                dispatch(rmqSubscribe({
                  // TODO: need to get channel name from store
                  channel: `/exchange/events/testnet-bitcoin-middleware-chronobank-io_balance.${address}`,
                  handler: ({ body }) => {
                    if (!body) {
                      // TODO: need to handle possible errors in reply
                      return
                    }

                    try {
                      const data = JSON.parse(body)
                      const confirmations0 = data.balances.confirmations0
                      const confirmations6 = data.balances.confirmations6
                      const balance0 = convertSatoshiToBTC(confirmations0)
                      const balance6 = convertSatoshiToBTC(confirmations6)

                      dispatch(updateBitcoinBalance({
                        address: data.address,
                        masterWalletAddress: ethAddress,
                        balance: balance0 || balance6,
                        amount: confirmations0 || confirmations6,
                      }))
                    } catch (error) {
                      // TODO: to handle any errors here
                      // Silently ignore any errors for now.
                      // eslint-disable-next-line no-console
                      console.log(error)
                    }
                  },
                }))

                //subscribe on transactions
                dispatch(rmqSubscribe({
                  // TODO: need to get channel name from store
                  channel: `/exchange/events/testnet-bitcoin-middleware-chronobank-io_transaction.${address}`,
                  handler: ({ body }) => {
                    if (!body) {
                      // TODO: need to handle possible errors in reply
                      return
                    }
                    try {
                      const data = JSON.parse(body)
                      const txList = [
                        {
                          from: data.inputs[0].address,
                          to: data.outputs[0].address,
                          amount: data.outputs[0].value,
                          balance: convertSatoshiToBTC(data.outputs[0].value),
                          timestamp: data.timestamp,
                          hash: body.hash,
                          confirmations: data.confirmations,
                        },
                      ]
                      dispatch(updateBitcoinTxHistory({
                        address,
                        masterWalletAddress: ethAddress,
                        txList,
                        latestTxDate: data.timestamp,
                      }))
                    } catch (error) {
                      // TODO: to handle any errors here
                      // Silently ignore any errors for now.
                      // eslint-disable-next-line no-console
                      console.log(error)
                    }
                  },
                }))
              })
              dispatch(login(ethAddress))
              return resolve()
            })
            .catch((error) => {
              return reject(error)
            })
        })
        .catch((error) => {
          return reject(error)
        })
    } catch (error) {
      return reject(error)
    }
  })
}

export const logoutThunk = () => (dispatch) => {
  try {
    dispatch(rmqDisconnect())
    dispatch(stopMarket())
    return dispatch(logout())
  } catch (error) {
    return Promise.reject(error)
  }
}