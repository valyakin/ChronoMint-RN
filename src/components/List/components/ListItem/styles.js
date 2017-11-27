import themeFactory from 'src/utils/themeFactory'
import { LINE, UNIT, FOREGROUND, BACKGROUND_LIGHT } from 'src/constants/styles'

export default themeFactory({
  container: {
    height: 6 * UNIT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftSection: {
    width: LINE,
    marginHorizontal: UNIT
  },
  rightSection: {
    marginHorizontal: UNIT
  },
  arrow: {
    marginRight: 2 * UNIT,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
    flex: 1,
    textAlign: 'left'
  }
}, {
  dark: {
    text: {
      color: BACKGROUND_LIGHT
    }
  },
  light: {
    text: {
      color: FOREGROUND
    }
  }
})
