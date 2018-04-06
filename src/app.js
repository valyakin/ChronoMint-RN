import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import I18n from 'react-native-i18n'
import './utils/shim'
import './utils/i18n'
import { store } from './redux/configureStore'
import registerScreens from './screens/registerScreens'

registerScreens(store, Provider)

Navigation.startSingleScreenApp({
  screen: {
    screen: 'SelectLoginOption',
    title: I18n.t('Wallet.title'),
  },
  appStyle: {
    disabledBackGesture: true,
    navBarBackgroundColor: '#614DBA',
    navBarTextColor: '#BDB2FF',
    navBarButtonColor: '#FFFFFF',
    statusBarTextColorScheme: 'light',
    screenBackgroundColor: '#242045',
    hideBackButtonTitle: true,
  },
  drawer: {
    left: {
      screen: 'Drawer',
    },
    animationType: 'parallax',
    disableOpenGesture: true,
  },
})
