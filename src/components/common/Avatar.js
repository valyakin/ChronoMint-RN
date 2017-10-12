import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet } from 'react-native'
import { UNIT } from '../../styles'

const Avatar = ({ image }) =>
  <View style={style.container}>
    <Image source={image} style={style.image} />
  </View>

Avatar.propTypes = {
  image: PropTypes.number
}

export default Avatar

const style = StyleSheet.create({
  container: {
    width: 4 * UNIT,
    height: 4 * UNIT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 4 * UNIT,
    height: 4 * UNIT,
  }
})
