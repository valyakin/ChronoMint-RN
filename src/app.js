import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import I18n from 'react-native-i18n'
import './utils/shim'
import './utils/i18n'
import { store } from './redux/configureStore'
import registerScreens from './screens/registerScreens'
import images from './assets/images'

registerScreens(store, Provider)

Navigation.startSingleScreenApp({
  screen: {
    screen: 'WalletsList',
    title: I18n.t('WalletsList.title'),
    navigatorButtons: {
      leftButtons: [
        {
          id: 'drawer',
          icon: images.burger,
        },
      ],
      rightButtons : [
        {
          id: 'addWallet',
          icon: images.plus, 
        },
      ],
    },
  },
  appStyle: {
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
      fixedWidth: 320,
    },
    animationType: 'parallax',
  },
})
