/* @flow */
import { StyleSheet } from 'react-native'
import { UNIT, COLOR_BACKGROUND } from '../../constants/styles'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0.5 * UNIT,
  },
  bullet: {
    width: UNIT,
    height: UNIT,
    borderRadius: 0.5 * UNIT,
    backgroundColor: 'red',
    margin: 0.5 * UNIT,
  },
  bulletFetching: {
    backgroundColor: '#9E9E9E',
  },
  bulletSyncing: {
    backgroundColor: '#FFAB00',
  },
  bulletSynced: {
    backgroundColor: '#00C853',
  },
  label: {
    fontSize: 12,
    color: COLOR_BACKGROUND,
  },
})
