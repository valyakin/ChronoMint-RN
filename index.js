import { Navigation } from 'react-native-navigation'
import './shim'
import screens from './src/screens'

Navigation.startSingleScreenApp({
  screen: {
    screen: screens.SplashScreen,
  },
})
