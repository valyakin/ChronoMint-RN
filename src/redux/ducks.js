import * as network from 'chronobank/login/redux/network'
import * as assetsManager from 'redux/assetsManager'
import * as drawer from 'redux/drawer'
import * as exchange from 'redux/exchange'
import * as locs from 'redux/locs'
import * as mainWallet from 'redux/mainWallet'
import * as market from 'redux/market'
import * as modals from 'redux/modals'
import * as multisigWallet from 'redux/multisigWallet'
import * as notifier from 'redux/notifier'
import * as operations from 'redux/operations'
import * as rewards from 'redux/rewards'
import * as session from 'redux/session'
import * as settings from 'redux/settings'
import * as voting from 'redux/voting'
import * as wallet from 'redux/wallet'
import * as watcher from 'redux/watcher'
import * as tokens from 'redux/tokens'
import * as assetsHolder from 'redux/assetsHolder'
import * as ui from './ui'

const Login = {
  network,
}

export default {
  ui,
  modals,
  drawer,
  session,
  locs,
  voting,
  wallet,
  mainWallet,
  multisigWallet,
  rewards,
  exchange,
  settings,
  notifier,
  operations,
  watcher,
  market,
  assetsManager,
  tokens,
  assetsHolder,
  ...Login,
}
