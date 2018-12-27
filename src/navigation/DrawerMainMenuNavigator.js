/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation'
import WalletStack from './WalletStack'
import DrawerMainMenu from '../components/DrawerMainMenu'

const renderDrawerMainMenu = (props) => (
  <DrawerMainMenu {...props} />
)

const DrawerMainMenuNavigator = createDrawerNavigator(
  {
    WalletStack,
  },
  {
    contentComponent: renderDrawerMainMenu,
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleMainMenuDrawer: () =>
          DrawerActions.toggleDrawer({ key: stateKey }),
      }
    },
    navigationOptions: {
      headerTransparent: true,
      headerForceInset: { top: 'never' },
      headerStyle: {
        marginTop: 0,
      },
    },
  }
)

export default DrawerMainMenuNavigator
