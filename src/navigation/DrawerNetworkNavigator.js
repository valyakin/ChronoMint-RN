/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation'
import LoginStack from './LoginStack'
import DrawerNetwork from '../components/DrawerNetwork'

const renderDrawerNetwork = (props) => (
  <DrawerNetwork {...props} />
)

const DrawerNetworkNavigator = createDrawerNavigator(
  {
    LoginStack,
  },
  {
    contentComponent: renderDrawerNetwork,
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleNetworkDrawer: () =>
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

export default DrawerNetworkNavigator
