/* @flow */
import { StyleSheet } from 'react-native'
import { UNIT, BACKGROUND, BACKGROUND_LIGHT, FOREGROUND } from 'src/constants/styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: BACKGROUND
  },
  title: {
    fontSize: 34,
    lineHeight: 34,
    marginHorizontal: 2 * UNIT,
    marginTop: 2 * UNIT,
    marginBottom: UNIT,
    color: '#00005F',
    alignSelf: 'flex-start'
  },
  subtitle: {
    color: FOREGROUND,
    margin: 2 * UNIT,
    lineHeight: 30,
    alignSelf: 'flex-start',
    opacity: .6,
    fontSize: 20
  },
})
