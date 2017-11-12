import { Navigation } from 'react-native-navigation'
import scenes from './src/scenes'

Navigation.startSingleScreenApp({
  screen: {
    screen: scenes.SplashScreen
  }
})
