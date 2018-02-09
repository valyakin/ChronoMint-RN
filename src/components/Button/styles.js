import { StyleSheet } from 'react-native'
import { UNIT, COLOR_BACKGROUND_LIGHT, COLOR_FOREGROUND, LINE } from '../../constants/styles'

export default StyleSheet.create({
  container: {
    margin: UNIT,
    borderRadius: 10,
    backgroundColor: '#2962FF',
    paddingVertical: UNIT,
    paddingHorizontal: 4 * UNIT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDisabled: {
    backgroundColor: '#6A75BC',
  },
  leftSection: {
    marginRight: UNIT,
  },
  rightSection: {
    marginLeft: UNIT,
  },
  label: {
    color: COLOR_FOREGROUND,
    height: LINE,
  }, 
  labelDark: {
    color: COLOR_BACKGROUND_LIGHT,
    height: LINE,
  },
})
