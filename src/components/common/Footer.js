import React from 'react'
import {
    View    
} from 'react-native'
import Text from './Text'
import LinearGradient from 'react-native-linear-gradient'
import {
  UNIT
} from '../../styles'

const Footer = () => (
  <LinearGradient
    colors={['#644EBF', '#262448']}
    style={{
      paddingHorizontal: 2 * UNIT,
    }}
  >
    <Text>Hello</Text>
  </LinearGradient>
)

export default Footer
