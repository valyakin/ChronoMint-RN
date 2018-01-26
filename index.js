import 'node-libs-react-native'
import { Navigation } from 'react-native-navigation'
import { store } from './src/redux/configureStore'
import screens from './src/screens'
import networkService from '@chronobank/login/network/NetworkService'

networkService.connectStore(store)

Navigation.startSingleScreenApp({
  screen: {
    screen: screens.SplashScreen
  }
})
