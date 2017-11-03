/* @flow */
import registerScreens from './registerScreens'
import SplashScreen from './SplashScreen'
import OptionSelector from './Login/OptionSelector'

const screens = {
  SplashScreen,
  Login: {
    OptionSelector
  }
}

const screenIds: typeof screens = registerScreens(screens)

export default screenIds
