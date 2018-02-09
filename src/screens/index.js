/* @flow */
import { Provider } from 'react-redux'
import registerScreens from '../utils/registerScreens'
import { store } from '../redux/configureStore'
import SplashScreen from './SplashScreen'
import OptionSelector from './Login/OptionSelector'
import LoginSettings from './Login/LoginSettings'
import SelectNetwork from './Login/SelectNetwork'
import ChangeLanguage from './Login/ChangeLanguage'
import EnterMnemonic from './Login/EnterMnemonic'
import GenerateMnemonic from './Login/GenerateMnemonic'
import WalletFile from './Login/WalletFile'
import GenerateWallet from './Login/GenerateWallet'
import EnterPin from './Login/EnterPin'
import EnterPrivate from './Login/EnterPrivate'
import Wallet from './Wallet/Wallet'

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
    EnterPin,
    EnterPrivate,
  },
  Wallet,
}

/**
 * @typeof screens
 */
const screenIds = registerScreens(screens, '', store, Provider)

export default screenIds
