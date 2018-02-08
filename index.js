import { Navigation } from 'react-native-navigation'
import './shim'
import SplashScreen from './src/screens/SplashScreen'

Navigation.registerComponent('splashScreen', () => SplashScreen)

Navigation.startSingleScreenApp({
  screen: {
    screen: 'splashScreen',
  },
})
