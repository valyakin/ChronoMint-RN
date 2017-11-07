import { StyleSheet } from 'react-native'
import { UNIT } from '@styleConstants'

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCCCDF',
    borderBottomWidth: 1,
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
})
