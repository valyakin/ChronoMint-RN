/* @flow */
import { StyleSheet } from 'react-native'
import { COLOR_ORANGE, UNIT, COLOR_BACKGROUND_LIGHT } from '../../constants/styles'

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
  },
  bullet: {
    color: COLOR_ORANGE,
    paddingRight: 2 * UNIT
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 2 * UNIT
  },
  list: {
    flex: 1,
    marginRight: 3 * UNIT
  },
  image: {
    marginTop: 0.5 * UNIT,
    marginRight: 3 * UNIT
  },
  text: {
    color: COLOR_BACKGROUND_LIGHT,
    fontSize: 2 * UNIT,
  }
})
