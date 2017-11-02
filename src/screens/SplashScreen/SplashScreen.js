/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { ImageBackground, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

type Props = {
  navigator: Object
}

export default class SplashScreen extends React.Component<Props> {
  static propTypes = {
    navigator: PropTypes.object
  }
  
  static navigatorStyle = {
    navBarHidden: true,
    statusBarHidden: true,
    statusBarTextColorScheme: 'dark'
  }

  render () {
    return (
      <ImageBackground
        source={require('@images/splash.png')}
        style={{ width, height }}
        onLoadEnd={() => {
          this.props.navigator.resetTo({
            screen: 'Login/OptionSelector',
            animationType: 'fade'
          })
        }}
      />
    )
  }
}
