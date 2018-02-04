import 'node-libs-react-native'
import { Navigation } from 'react-native-navigation'
// import SplashScreen from './src/screens/SplashScreen'
import { store } from './src/redux/configureStore'
import screens from './src/screens'
import { bootstrap } from 'redux/session/actions'
import networkService from '@chronobank/login/network/NetworkService'

networkService.connectStore(store)
store.dispatch(bootstrap()).then(() => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: screens.Login.OptionSelector
    }
  })
})
