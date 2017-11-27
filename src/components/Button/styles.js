import themeFactory from 'src/utils/themeFactory'
import { UNIT, BACKGROUND_LIGHT, FOREGROUND } from 'src/constants/styles'


export default themeFactory({
  container: {
    paddingVertical: UNIT,
    paddingHorizontal: 4 * UNIT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftSection: {
    marginRight: UNIT
  },
  rightSection: {
    marginLeft: UNIT
  },
  label: {
    color: FOREGROUND
  }
}, {
  dark: {
    label: {
      color: BACKGROUND_LIGHT
    }
  }
})
