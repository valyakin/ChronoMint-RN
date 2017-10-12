import { Navigation } from 'react-native-navigation'

import SplashScreen from './SplashScreen'
import LoginScreen from './LoginScreen'

export function registerScreens () {
  Navigation.registerComponent('SplashScreen', () => SplashScreen)
  Navigation.registerComponent('LoginScreen', () => LoginScreen)
}
