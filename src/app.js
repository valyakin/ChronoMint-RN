import { Navigation } from 'react-native-navigation'
import './shim'
import screens from './screens'

Navigation.startSingleScreenApp({
  screen: {
    screen: screens.Wallets,
    title: 'My wallets',
    navigatorButtons: {
      leftButtons: [
        {
          id: 'drawer',
          icon: require('./assets/icons/burger.png'),
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
  },
  drawer: {
    left: {
      screen: screens.Drawer,
      fixedWidth: 320,
    },
    animationType: 'parallax',
  },
})
