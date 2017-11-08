import themeFactory from 'src/utils/themeFactory'
import { UNIT, BACKGROUND_LIGHT, BACKGROUND_DARK, FOREGROUND } from 'src/constants/styles'

export default themeFactory({
  itemContainer: {
    height: 6 * UNIT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  spacer: {
    flex: 1
  },
  itemIcon: {
    marginHorizontal: UNIT
  },
  itemChevronContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
},
{
  dark: {
    text: {
      color: BACKGROUND_LIGHT
    }
  },
  light: {
    list: {
      backgroundColor: BACKGROUND_LIGHT,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: BACKGROUND_DARK
    },
    text: {
      color: FOREGROUND
    }
  }
})

