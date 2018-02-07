import React from 'react'
import { ImageBackground } from 'react-native'
import { bootstrap } from 'redux/session/actions'
import { store } from '../redux/configureStore'
import scenes from './'

export default class SplashScreen extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarHidden: true,
    statusBarTextColorScheme: 'light'
  }

  handleLoadEnd = async () => {
    await store.dispatch(bootstrap())
    
    this.props.navigator.resetTo({
      screen: scenes.Login.OptionSelector,
      animationType: 'fade'
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
