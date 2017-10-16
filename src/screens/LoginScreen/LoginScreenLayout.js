/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import {
  ImageBackground,
  Image,
  Platform
} from 'react-native'

export default class LoginScreenLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object
  }
  
  render () {
    return (
      <ImageBackground
        source={require('../../assets/images/gradient.png')}
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: (Platform.OS !== 'ios' ? 54 : 64)
        }}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            marginTop: 40,
            marginBottom: 16
          }}
        />
        { this.props.children }
      </ImageBackground>
    )
  }
}
