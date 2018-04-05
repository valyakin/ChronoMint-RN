/* @flow */

import BalanceModel from '../../mint/src/models/tokens/BalanceModel'
import BalancesCollection from '../../mint/src/models/tokens/BalancesCollection'

/**
 * Type created via 'typof BalanceModel'
 */
export type TBalanceModel = typeof BalanceModel

/**
 * Type created via 'typof BalancesCollection'
 */
export type TBalancesCollection = typeof BalancesCollection

export type TBalance = {
  amount: number,
  currency: string,
}

export type TBalanceList = TBalance[]
