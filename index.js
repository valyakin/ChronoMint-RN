import { Navigation } from 'react-native-navigation'
import screenIds from './src/screens'

Navigation.startSingleScreenApp({
  screen: {
    screen: screenIds.SplashScreen
  }
})
