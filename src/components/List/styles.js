import { StyleSheet } from 'react-native'
import { UNIT, COLOR_BACKGROUND, COLOR_BACKGROUND_LIGHT, COLOR_BACKGROUND_DARK, COLOR_FOREGROUND } from '../../constants/styles'

export default StyleSheet.create({
  itemContainer: {
    height: 6 * UNIT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  separator: {
    height: 1,
    marginLeft: 5 * UNIT,
    backgroundColor: '#CCCCDF',
  },
  itemIcon: {
    marginHorizontal: UNIT,
  },
  sectionHeader: {
    backgroundColor: COLOR_BACKGROUND,
    height: 5 * UNIT,
    flexDirection: 'row',
    alignItems: 'center',
    padding: UNIT,
    borderTopWidth: 1,
    borderTopColor: COLOR_BACKGROUND_DARK,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_BACKGROUND_DARK,
  },
  itemChevronContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  list: {
    backgroundColor: COLOR_BACKGROUND_LIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLOR_BACKGROUND_DARK,
  },
  listDark: {},
  text: {
    color: COLOR_FOREGROUND,
  },
})

