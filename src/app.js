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
import './init'
import store from './redux/configureStore'
import registerScreens from './registerScreens'

registerScreens(store, Provider)

let currentRoot = ''

export default function startAppRoot (root: string) {
  if (currentRoot === root) return 

  switch (root) {
    case 'wallet': {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'WalletsList',
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

      break
    }
    case 'login':
    default: {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'CreateWallet',
          navigatorStyle: {
            navBarHidden: true,
          },
        },
        appStyle: {
          disabledBackGesture: true,
          drawUnderNavBar: true,
          hideBackButtonTitle: true,
          navBarButtonColor: '#FFFFFF',
          navBarNoBorder: true,
          navBarTextColor: '#BDB2FF',
          navBarTextFontSize: 16,
          navBarTranslucent: true,
          navBarTransparent: true,
          screenBackgroundColor: '#242045',
          statusBarTextColorScheme: 'light',
          topBarElevationShadowEnabled: false,
        },
        drawer: {
          left: {
            screen: 'SelectNetwork',
          },
          right: {
            screen: 'SelectLanguage',
          },
          animationType: 'parallax',
          disableOpenGesture: true,
          style: {
            drawerShadow: false,
            leftDrawerWidth: 75,
            rightDrawerWidth: 75,
          },
        },
      })

      break
    }
  }

  currentRoot = root
}

startAppRoot('login')
