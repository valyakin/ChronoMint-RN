/* @flow */
import { StyleSheet, Platform } from 'react-native'
import { BACKGROUND, UNIT } from '@styleConstants'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: UNIT,
    alignItems: 'center',
    paddingTop: (Platform.OS !== 'ios' ? 54 : 64)
  },
  logo: {
    marginTop: 40,
    marginBottom: 2 * UNIT
  },
  title: {
    fontSize: 34,
    lineHeight: 34,
    marginHorizontal: UNIT,
    marginTop: 2 * UNIT,
    marginBottom: UNIT,
    color: BACKGROUND,
    alignSelf: 'flex-start'
  },
  subtitle: {
    color: BACKGROUND,
    margin: UNIT,
    lineHeight: 30,
    alignSelf: 'flex-start',
    opacity: .6,
    fontSize: 20
  }
})
