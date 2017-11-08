import stylesFactory from 'src/utils/stylesFactory'
import {
  UNIT,
  BACKGROUND,
  FOREGROUND
} from 'src/styleConstants'

const common = {
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: UNIT
  },
  spacer: {
    flex: 1
  },
  itemIcon: {
    marginRight: UNIT
  },
  itemChevronContainer: {
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

export default stylesFactory(common, { dark, light })
