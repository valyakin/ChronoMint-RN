/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Animated,
  Easing,
} from 'react-native'
import {
  createStackNavigator,
  HeaderBackButton,
  DrawerActions,
} from 'react-navigation'
import MenuIcon from '../components/MenuIcon'
import WalletList from '../screens/Wallet/WalletList'
import Wallet from '../screens/Wallet/Wallet'
import Send from '../screens/Wallet/Send'
import SendEth from '../screens/Wallet/SendEth'
import TokenSelector from '../screens/Wallet/TokenSelector'
import i18n from '../locales/translation'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [{ translateX }] }
    },
    containerStyle: {
      backgroundColor: 'transparent',
    },
  }
}

const WalletStack = createStackNavigator(
  {
    'WalletList': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.WalletList'),
        headerLeft: <MenuIcon onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />,
      }),
      screen: WalletList,
    },
    'Wallet': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.Wallet'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: Wallet,
    },
    'Send': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.Send'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: Send,
    },
    'SendEth': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.Send'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: SendEth,
    },
    'TokenSelector': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.TokenSelector'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: TokenSelector,
    },
  },
  {
    initialRouteName: 'WalletList',
    navigationOptions: () => ({
      headerForceInset: { top: 'never' },
      headerTransparent: true,
      headerBackTitle: null,
      headerTintColor: 'white',
    }),
    cardStyle: {
      backgroundColor: 'transparent',
    },
    transitionConfig,
    transparentCard: true,
  }
)

export default WalletStack
