import * as network from '@chronobank/login/redux/network'
import * as monitor from '@chronobank/login/redux/monitor'
import * as assetsManager from '@chronobank/mint/src/redux/assetsManager'
import * as drawer from '@chronobank/mint/src/redux/drawer'
import * as exchange from '@chronobank/mint/src/redux/exchange'
import * as locs from '@chronobank/mint/src/redux/locs'
import * as mainWallet from '@chronobank/mint/src/redux/mainWallet'
import * as market from '@chronobank/mint/src/redux/market'
import * as modals from '@chronobank/mint/src/redux/modals'
import * as multisigWallet from '@chronobank/mint/src/redux/multisigWallet'
import * as notifier from '@chronobank/mint/src/redux/notifier'
import * as operations from '@chronobank/mint/src/redux/operations'
import * as rewards from '@chronobank/mint/src/redux/rewards'
import * as session from '@chronobank/mint/src/redux/session'
import * as settings from '@chronobank/mint/src/redux/settings'
import * as ui from './ui'
import * as voting from '@chronobank/mint/src/redux/voting'
import * as wallet from '@chronobank/mint/src/redux/wallet'
import * as watcher from '@chronobank/mint/src/redux/watcher'

const Login = {
  monitor,
  network
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
  ...Login,
}
