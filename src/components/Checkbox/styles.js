// @flow
import { StyleSheet } from 'react-native'
import { COLOR_BACKGROUND_LIGHT, UNIT, COLOR_FOREGROUND } from '../../constants/styles'

export default StyleSheet.create({
  container: {
    padding: UNIT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: COLOR_FOREGROUND
  },
  labelDark: {
    color: COLOR_BACKGROUND_LIGHT
  },
  checkboxContainer: {
    marginRight: UNIT
  }
})
