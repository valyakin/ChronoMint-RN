import 'node-libs-react-native'
import 'core-js/es6/symbol'
import 'core-js/fn/symbol/iterator'
import { Navigation } from 'react-native-navigation'
import { store } from './src/redux/configureStore'
import screens from './src/screens'
import { bootstrap } from 'redux/session/actions'
import networkService from '@chronobank/login/network/NetworkService'

window.web3 = require('web3')

networkService.connectStore(store)

Navigation.startSingleScreenApp({
  screen: {
    screen: screens.SplashScreen
  }
})
