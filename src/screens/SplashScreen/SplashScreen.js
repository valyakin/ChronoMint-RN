/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { ImageBackground } from 'react-native'
import screenIds from '../'

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
    statusBarTextColorScheme: 'light'
  }

  render () {
    return (
      <ImageBackground
        source={require('@images/splash.png')}
        style={{ flex: 1 }}
        onLoadEnd={() => {
          this.props.navigator.resetTo({
            screen: screenIds.Login.OptionSelector,
            animationType: 'fade'
          })
        }}
      />
    )
  }
}
