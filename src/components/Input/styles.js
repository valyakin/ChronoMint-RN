import themeFactory from 'src/utils/themeFactory'
import { StyleSheet } from 'react-native'
import { BACKGROUND_DARK, UNIT, BACKGROUND_LIGHT } from 'src/constants/styles'

export default themeFactory({
  container: {
    padding: UNIT,
  },
  label: {
    fontSize: 12,
  },
  input: {
    fontSize: 14,
  }
}, {
  dark: {
    container: {
      backgroundColor: 'rgba(255, 255, 255, .1)',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: BACKGROUND_DARK,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: BACKGROUND_DARK,
    },
    label: {
      color: BACKGROUND_LIGHT,
      opacity: .8,
    },
    input: {
      color: BACKGROUND_LIGHT
    }
  }
})
