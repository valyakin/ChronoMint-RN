import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import {
  UNIT,
  BACKGROUND
} from '../../styles'

const SliderBullets = ({ count, active }) =>
  <View style={style.container}>
    {
      Array(count).fill().map((elem, key) => (
        <View style={(key === active) ? style.activeItem : style.item} key={key} />
      ))
    }
  </View>

SliderBullets.propTypes = {
  count: PropTypes.number,
  active: PropTypes.number
}

export default SliderBullets

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    margin: 0.375 * UNIT,
    width: 0.5 * UNIT,
    height: 0.5 * UNIT,
    borderRadius: 0.25 * UNIT,
    opacity: 0.6,
    backgroundColor: BACKGROUND
  },
  activeItem: {
    margin: 0.25 * UNIT,
    width: 0.75 * UNIT,
    height: 0.75 * UNIT,
    borderRadius: 0.375 * UNIT,
    backgroundColor: BACKGROUND
  }
})
