import React from 'react'
import {
  ImageBackground,
  Dimensions,
  StatusBar
} from 'react-native'

const { width, height } = Dimensions.get('window')

const SplashScreen = () =>
  <ImageBackground
    source={require('../assets/images/splash.png')}
    style={{ width, height }}
  >
    <StatusBar
      barStyle='light-content'
    />
  </ImageBackground>

export default SplashScreen
