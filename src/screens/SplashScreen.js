import React from 'react'
import { ImageBackground } from 'react-native'
// import scenes from './'

export default class SplashScreen extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarHidden: true,
    statusBarTextColorScheme: 'light'
  }

  handleLoadEnd = () => {
    // this.props.navigator.resetTo({
    //   screen: scenes.Login.OptionSelector,
    //   animationType: 'fade'
    // })
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
