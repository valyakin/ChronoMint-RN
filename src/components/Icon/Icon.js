/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import styles from './styles'

export default class Icon extends React.Component {
  static propTypes = {
    source: PropTypes.number.isRequired,
    style: PropTypes.any
  }

  render () {
    const { source, style } = this.props
    return (
      <View
        style={[
          styles.container,
          style
        ]}
      >
        <Image
          source={source}
        />
      </View>
    )
  }
}
