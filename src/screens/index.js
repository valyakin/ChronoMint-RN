/* @flow */
import registerScreens from '../utils/registerScreens'
// import { store } from 'src/redux/configureStore'
// import { Provider } from 'react-redux'
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
    EnterPrivate
  }
}

/**
 * @typeof screens
 */
const screenIds = registerScreens(screens, '')

export default screenIds
