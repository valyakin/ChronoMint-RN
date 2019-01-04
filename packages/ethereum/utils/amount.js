/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import BigNumber from 'bignumber.js'
import web3utils from 'web3/lib/utils/utils'
import { DECIMALS } from '../constants'

// short to long (with no dot)
export const balanceToAmount = (balance, decimals = DECIMALS) => {
  const amountBN = new BigNumber(balance.toString())
  return amountBN.multipliedBy(Math.pow(10, decimals))
}

// long to 1.11
export const amountToBalance = (amount, decimals = DECIMALS) => {
  const balanceBN = new BigNumber(amount)
  return balanceBN.dividedBy(Math.pow(10, decimals))
}

export const convertToWei = (amount) => web3utils.toWei(amount)
export const convertFromWei = (amount) => web3utils.fromWei(amount)
