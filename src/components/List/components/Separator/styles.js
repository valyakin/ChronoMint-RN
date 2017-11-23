import themeFactory from 'src/utils/themeFactory'
import { UNIT } from 'src/constants/styles'

export default themeFactory({
  separator: {
    height: 1,
    marginLeft: 5 * UNIT,
    backgroundColor: '#CCCCDF'
  }
}, {
  dark: {
    separator: {
      backgroundColor: 'transparent'
    }
  }
})
