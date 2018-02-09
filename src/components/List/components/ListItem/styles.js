// @flow
import { StyleSheet } from 'react-native'
import { LINE, UNIT, COLOR_FOREGROUND, COLOR_BACKGROUND_LIGHT } from '../../../../constants/styles'

export default StyleSheet.create({
  container: {
    height: 6 * UNIT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    width: LINE,
    marginHorizontal: UNIT,
  },
  rightSection: {
    marginHorizontal: UNIT,
  },
  arrow: {
    marginRight: 2 * UNIT,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    color: COLOR_FOREGROUND,
    flex: 1,
    textAlign: 'left',
  },
  textDark: {
    color: COLOR_BACKGROUND_LIGHT,
    flex: 1,
    textAlign: 'left',
  },
})
