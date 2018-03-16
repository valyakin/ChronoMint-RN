// @flow
import { UNIT, COLOR_BACKGROUND_LIGHT, FONT_MEDIUM } from '../../../constants/styles'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  actions: {
    margin: UNIT,
    flexDirection: 'row',
  },
  input: {
    height: 10 * UNIT,
  },
  attentionText: {
    color: COLOR_BACKGROUND_LIGHT,
    margin: 2 * UNIT,
    fontSize: 2 * UNIT,
    fontWeight: FONT_MEDIUM,
  },
  continueButton: {
    flex: 1,
  },
})
