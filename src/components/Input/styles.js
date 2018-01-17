// @flow
import { StyleSheet } from 'react-native'
import { UNIT, COLOR_BACKGROUND_LIGHT } from '../../constants/styles'

export default StyleSheet.create({
  container: {
    padding: UNIT,
  },
  containerDark: {
    padding: UNIT,
    backgroundColor: 'rgba(255, 255, 255, .1)'
  },
  label: {
    fontSize: 12,
  },
  labelDark: {
    fontSize: 12,
    color: COLOR_BACKGROUND_LIGHT,
    opacity: .8,
  },
  input: {
    fontSize: 14,
  },
  inputDark: {
    fontSize: 14,
    color: COLOR_BACKGROUND_LIGHT
  }
})
