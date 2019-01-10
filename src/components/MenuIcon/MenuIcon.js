/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image } from 'react-native'
import { menu } from '../../images'
import styles from './MenuIconStyles'

export default class MenuIcon extends React.Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  render () {
    const { onPress } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
      >
        <Image
          source={menu}
          style={styles.menuImage}
        />
      </TouchableOpacity>
    )
  }
}
