/* @flow */
import registerScreens from 'src/utils/registerScenes'
import SplashScreen from './SplashScreen'
import OptionSelector from './Login/OptionSelector'
import LoginSettings from './Login/LoginSettings'
import SelectNetwork from './Login/SelectNetwork'

const screens = {
  SplashScreen,
  Login: {
    OptionSelector,
    LoginSettings,
    SelectNetwork
  }
}

const screenIds: typeof screens = registerScreens(screens)

export default screenIds
