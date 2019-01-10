/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { requestBitcoinTransactionsHistoryByAddress } from '../service/api'
import { convertSatoshiToBTC } from '../utils/amount'
import { getAddress } from '../utils'
import * as Actions from './actions'

export const createBitcoinWallet = (privateKey, ethAddress) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
    try {
      const network = getCurrentNetwork(getState()).networkType
      const bitcoinAddress = getAddress(privateKey, network)
      dispatch(Actions.bitcoinCreateWallet(ethAddress, bitcoinAddress))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const selectBitcoinWallet = ({ address }) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(requestBitcoinTransactionsHistoryByAddress(address))
        .then((response) => {
          const masterWalletAddress = getCurrentWallet(getState())
          const timestamps = []
          const txList = response.payload.data.map((tx) => {
            timestamps.push(tx.timestamp)
            return {
              from: tx.inputs[0].address,
              to: tx.outputs[0].address,
              amount: tx.outputs[0].value,
              balance: convertSatoshiToBTC(tx.outputs[0].value),
              timestamp: tx.timestamp,
              hash: tx.hash,
              confirmations: tx.confirmations,
            }
          })
          dispatch(updateBitcoinTxHistory({
            address,
            masterWalletAddress,
            txList,
            latestTxDate: Math.max(...timestamps),
            withReset: true,
          }))
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error)
        })
      dispatch(Actions.bitcoinSelectWallet(address))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftRecipient = ({ address, masterWalletAddress, recipient }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateRecipient({ address, masterWalletAddress, recipient }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftAmount = ({ address, masterWalletAddress, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateAmount({ address, masterWalletAddress, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxHistory = ({ latestTxDate, txList, masterWalletAddress, address, withReset = false }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxUpdateHistory({ latestTxDate, txList, masterWalletAddress, address, withReset }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftToken = ({ address, masterWalletAddress, token }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateToken({ address, masterWalletAddress, token }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftFee = ({ address, masterWalletAddress, fee }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateFee({ address, masterWalletAddress, fee }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftFeeMultiplier = ({ address, masterWalletAddress, feeMultiplier }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateFeeMultiplier({ address, masterWalletAddress, feeMultiplier }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftUnsignedTx = ({ address, masterWalletAddress, unsignedTx }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateUnsignedTx({ address, masterWalletAddress, unsignedTx }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftSignedTx = ({ address, masterWalletAddress, signedTx }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateSignedTx({ address, masterWalletAddress, signedTx }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const createBitcoinTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinCreateTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const dropBitcoinSelectedWallet = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinDropSelectedWallet())
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const deleteBitcoinTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinDeleteTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinBalance = ({ address, masterWalletAddress, balance, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinUpdateBalance({ address, masterWalletAddress, balance, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}
