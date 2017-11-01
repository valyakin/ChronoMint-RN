/* @flow */
import { Navigation } from 'react-native-navigation'

import SplashScreen from './SplashScreen'
import OptionSelector from './LoginScreen/OptionSelector'

export function registerScreens () {
  Navigation.registerComponent('SplashScreen', () => SplashScreen)
  Navigation.registerComponent('LoginScreen.OptionSelector', () => OptionSelector)
}
