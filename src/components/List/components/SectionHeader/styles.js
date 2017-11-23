import themeFactory from 'src/utils/themeFactory'
import { UNIT, BACKGROUND, BACKGROUND_DARK } from 'src/constants/styles'

export default themeFactory({
  sectionHeader: {
    backgroundColor: BACKGROUND,
    height: 5 * UNIT,
    flexDirection: 'row',
    alignItems: 'center',
    padding: UNIT,
    borderTopWidth: 1,
    borderTopColor: BACKGROUND_DARK,
    borderBottomWidth: 1,
    borderBottomColor: BACKGROUND_DARK
  }
}, {})
