import 'node-libs-react-native'
import { Navigation } from 'react-native-navigation'
import screens from './src/screens'

Navigation.startSingleScreenApp({
  screen: {
    screen: screens.SplashScreen
  }
})
