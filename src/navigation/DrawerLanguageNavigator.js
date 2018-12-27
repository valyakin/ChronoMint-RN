/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation'
import DrawerNetworkNavigator from './DrawerNetworkNavigator'
import DrawerLanguage from '../components/DrawerLanguage'

const renderDrawerLanguage = (props) => (
  <DrawerLanguage {...props} />
)

const DrawerLanguageNavigator = createDrawerNavigator(
  {
    DrawerNetworkNavigator,
  },
  {
    drawerPosition: 'right',
    contentComponent: renderDrawerLanguage,
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleLanguageDrawer: () =>
          DrawerActions.toggleDrawer({ key: stateKey }),
      }
    },
    navigationOptions: {
      headerTransparent: true,
      headerForceInset: {
        top: 'never',
      },
      headerStyle: {
        marginTop: 0,
      },
    },
  },
)

export default DrawerLanguageNavigator
