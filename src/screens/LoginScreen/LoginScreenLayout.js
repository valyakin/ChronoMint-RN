/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import {
  ImageBackground,
  Platform
} from 'react-native'
import { Logo } from '@components'

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
        <Logo
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
