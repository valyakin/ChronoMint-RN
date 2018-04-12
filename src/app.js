/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import 'utils/i18n'
import 'utils/shim'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { store } from './redux/configureStore'
import registerScreens from './screens/registerScreens'

registerScreens(store, Provider)

Navigation.startSingleScreenApp({
  screen: {
    screen: 'CreateWallet',
  },
  appStyle: {
    disabledBackGesture: true,
    hideBackButtonTitle: true,
    navBarBackgroundColor: '#614DBA',
    navBarButtonColor: '#FFFFFF',
    navBarTextColor: '#BDB2FF',
    screenBackgroundColor: '#242045',
    statusBarTextColorScheme: 'light',
  },
  drawer: {
    left: {
      screen: 'Drawer',
    },
    animationType: 'parallax',
    disableOpenGesture: true,
  },
})
