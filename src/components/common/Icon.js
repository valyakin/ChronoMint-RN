import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet } from 'react-native'
import { LINE } from '../../styles'

const Icon = ({ image }) =>
  <View style={style.container}>
    <Image source={image} style={style.icon} />
  </View>

Icon.propTypes = {
  image: PropTypes.number
}

export default Icon

const style = StyleSheet.create({
  container: {
    width: LINE,
    height: LINE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    maxWidth: LINE,
    maxHeight: LINE
  }
})
