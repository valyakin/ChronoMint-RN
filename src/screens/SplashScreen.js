import React from 'react'
import PropTypes from 'prop-types'
import {
  ImageBackground,
  Dimensions,
  StatusBar
} from 'react-native'

const { width, height } = Dimensions.get('window')

const SplashScreen = ({ navigator }) =>
  <ImageBackground
    source={require('../assets/images/splash.png')}
    style={{ width, height }}
    onLoadEnd={() => {
      navigator.resetTo({
        screen: 'LoginScreen',
        animationType: 'fade',
        navigatorStyle: {
          navBarHidden: true
        }
      })
    }}
  >
    <StatusBar
      barStyle='light-content'
    />
  </ImageBackground>

SplashScreen.propTypes = {
  navigator: PropTypes.object
}

export default SplashScreen
