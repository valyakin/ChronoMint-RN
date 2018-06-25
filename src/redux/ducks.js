/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import * as assetsHolder from 'redux/assetsHolder'
import * as assetsManager from 'redux/assetsManager'
import * as exchange from 'redux/exchange'
import * as locs from 'redux/locs'
import * as mainWallet from 'redux/mainWallet'
import * as market from 'redux/market'
import * as multisigWallet from 'redux/multisigWallet'
import * as notifier from 'redux/notifier'
import * as operations from 'redux/operations'
import * as rewards from 'redux/rewards'
import * as session from 'redux/session'
import * as settings from 'redux/settings'
import * as tokens from 'redux/tokens'
import * as voting from 'redux/voting'
import * as wallet from 'redux/wallet'
import * as watcher from 'redux/watcher'
import * as network from 'login/redux/network/'
import * as sensitive from './sensitive'

import { type TStateSensitive } from './sensitive/reducer'

export {
  assetsHolder,
  assetsManager,
  exchange,
  locs,
  mainWallet,
  market,
  multisigWallet,
  network,
  notifier,
  operations,
  rewards,
  sensitive,
  session,
  settings,
  tokens,
  voting,
  wallet,
  watcher
}

export type TState = {} | {
  sensitive: TStateSensitive
}
