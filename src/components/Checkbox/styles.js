import themeFactory from 'src/utils/themeFactory'
import { UNIT, FOREGROUND, BACKGROUND_LIGHT } from 'src/constants/styles'

export default themeFactory({
  container: {
    padding: UNIT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: FOREGROUND
  },
  checkboxContainer: {
    marginRight: UNIT
  }
}, {
  dark: {
    label: {
      color: BACKGROUND_LIGHT
    }
  }
})
