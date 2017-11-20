import themeFactory from 'src/utils/themeFactory'
import { UNIT, BACKGROUND, FOREGROUND } from 'src/constants/styles'

const common = {
  container: {
    height: 6 * UNIT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginHorizontal: UNIT
  },
  arrow: {
    marginRight: 2 * UNIT,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
}

const dark = {
  text: {
    color: BACKGROUND
  }
}

const light = {
  text: {
    color: FOREGROUND
  }
}

export default themeFactory(common, { dark, light })
