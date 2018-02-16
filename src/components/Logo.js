/* @flow */
import React from 'react'
import { Image } from 'react-native'

const Logo = (props: {}) => (
  <Image
    source={require('../assets/images/logo.png')}
    {...props}
  />
)

export default Logo
