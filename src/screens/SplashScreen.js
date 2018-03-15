import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  splash: {
    flex: 1,
  },
})
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

    networkService.connectStore(store)

    await store.dispatch(bootstrap())

    this.props.navigator.resetTo({
      screen: 'Login.OptionSelector',
      animationType: 'fade',
    })
  }

  render () {
    return (
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.splash}
        onLoadEnd={this.handleLoadEnd}
      />
    )
  }
}
