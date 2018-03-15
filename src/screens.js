/* @flow */
import { Provider } from 'react-redux'
import registerScreens from './utils/registerScreens'
import { store } from './redux/configureStore'
import SplashScreen from './screens/SplashScreen'
import OptionSelector from './screens/Login/OptionSelector'
import LoginSettings from './screens/Login/LoginSettings'
import SelectNetwork from './screens/Login/SelectNetwork'
import ChangeLanguage from './screens/Login/ChangeLanguage'
import EnterMnemonic from './screens/Login/EnterMnemonic'
import GenerateMnemonic from './screens/Login/GenerateMnemonic'
import WalletFile from './screens/Login/WalletFile'
import EnterWalletPassword from './screens/Login/EnterWalletPassword'
import GenerateWallet from './screens/Login/GenerateWallet'
import EnterPin from './screens/Login/EnterPin'
import EnterPrivate from './screens/Login/EnterPrivate'
import Wallet from './screens/Wallet/Wallet'
import Wallets from './screens/Wallets/Wallets'
import Drawer from './screens/Drawer/Drawer'

const screens = {
  SplashScreen,
  Login: {
    OptionSelector,
    LoginSettings,
    SelectNetwork,
    ChangeLanguage,
    EnterMnemonic,
    GenerateMnemonic,
    WalletFile,
    GenerateWallet,
    EnterWalletPassword,
    EnterPin,
    EnterPrivate,
  },
  Wallet,
  Wallets,
  Drawer,
}

/**
 * @typeof screens
 */
const screenIds = registerScreens(screens, '', store, Provider)

export default screenIds
