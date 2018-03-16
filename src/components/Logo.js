/* @flow */
import React from 'react'
import { Image } from 'react-native'
import images from '../assets/images'

const Logo = (props: {}) => (
  <Image
    source={images.logo}
    {...props}
  />
)

export default Logo
