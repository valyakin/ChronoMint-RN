import React from 'react'
import { Image } from 'react-native'

export default class Logo extends React.Component {
  render () {
    return (
      <Image
        source={require('@images/logo.png')}
        {...this.props}
      />
    )
  }
}
