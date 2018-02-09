import React from 'react'
import { ImageBackground, Alert } from 'react-native'

export default class SplashScreen extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarHidden: true,
    statusBarTextColorScheme: 'light',
  }
  
  handleLoadEnd = async () => {
    window.web3 = require('web3')
    const networkService = require('@chronobank/login/network/NetworkService').default
    const { store } = require('../redux/configureStore')
    const { bootstrap } = require('redux/session/actions')
    const scenes = require('./').default

    networkService.connectStore(store)

    await store.dispatch(bootstrap())
    
    this.props.navigator.resetTo({
      screen: scenes.Login.OptionSelector,
      animationType: 'fade',
    })
  }

  render () {
    return (
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={{ flex: 1 }}
        onLoadEnd={this.handleLoadEnd}
      />
    )
  }
}
