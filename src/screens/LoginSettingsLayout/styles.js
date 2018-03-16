/* @flow */
import { StyleSheet } from 'react-native'
import { UNIT, COLOR_BACKGROUND, COLOR_FOREGROUND } from '../../../constants/styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: COLOR_BACKGROUND,
  },
  title: {
    fontSize: 34,
    lineHeight: 48,
    marginHorizontal: 2 * UNIT,
    marginTop: 2 * UNIT,
    marginBottom: UNIT,
    color: '#00005F',
    alignSelf: 'flex-start',
  },
  subtitle: {
    color: COLOR_FOREGROUND,
    margin: 2 * UNIT,
    lineHeight: 30,
    alignSelf: 'flex-start',
    opacity: .6,
    fontSize: 20,
  },
})
