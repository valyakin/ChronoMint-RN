/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { ImageBackground } from 'react-native'
import scenes from 'src/scenes'

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
        source={require('src/assets/images/splash.png')}
        style={{ flex: 1 }}
        onLoadEnd={() => {
          this.props.navigator.resetTo({
            screen: scenes.Login.OptionSelector,
            animationType: 'fade'
          })
        }}
      />
    )
  }
}
