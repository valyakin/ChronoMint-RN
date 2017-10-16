/* @flow */
import { Navigation } from 'react-native-navigation'

import SplashScreen from './SplashScreen'
import ProviderSelector from './LoginScreen/ProviderSelector'
import OptionSelector from './LoginScreen/OptionSelector'

export function registerScreens () {
  Navigation.registerComponent('SplashScreen', () => SplashScreen)
  Navigation.registerComponent('LoginScreen.ProviderSelector', () => ProviderSelector)
  Navigation.registerComponent('LoginScreen.OptionSelector', () => OptionSelector)
}
