/* @flow */
import registerScreens from 'src/utils/registerScenes'
import SplashScreen from './SplashScreen'
import OptionSelector from './Login/OptionSelector'
import LoginSettings from './Login/LoginSettings'
import SelectNetwork from './Login/SelectNetwork'
import ChangeLanguage from './Login/ChangeLanguage'
import EnterMnemonic from './Login/EnterMnemonic'

const screens = {
  SplashScreen,
  Login: {
    OptionSelector,
    LoginSettings,
    SelectNetwork,
    ChangeLanguage,
    EnterMnemonic,
  }
}

const screenIds: typeof screens = registerScreens(screens)

export default screenIds
