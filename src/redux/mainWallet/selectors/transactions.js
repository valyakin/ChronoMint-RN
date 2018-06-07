/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  createSelector,
} from 'reselect'
import { mainWalletStore } from 'redux/mainWallet/selectors/models'

export const getTxsFromDuck = (state: any) =>
  mainWalletStore(state)
    .transactions()

export const getTxs = () => createSelector(
  [ getTxsFromDuck ],
  (txs) => txs
)
