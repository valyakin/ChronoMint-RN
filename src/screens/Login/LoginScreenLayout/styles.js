/* @flow */
import { StyleSheet, Platform } from 'react-native'
import { COLOR_BACKGROUND, UNIT } from '../../../constants/styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: (Platform.OS !== 'ios' ? 54 : 64)
  },
  logo: {
    marginTop: 40,
    alignSelf: 'center',
    marginBottom: 2 * UNIT
  },
  title: {
    fontSize: 34,
    lineHeight: 34,
    marginHorizontal: 2 * UNIT,
    marginTop: 2 * UNIT,
    color: COLOR_BACKGROUND,
    alignSelf: 'flex-start'
  },
  subtitle: {
    color: COLOR_BACKGROUND,
    marginHorizontal: 2 * UNIT,
    marginBottom: UNIT,
    lineHeight: 3 * UNIT,
    height: 6 * UNIT,
    alignSelf: 'flex-start',
    opacity: .8,
    fontSize: 20
  },
  fetchingIndicator: {
    alignSelf: 'flex-start'
  },
  contentArea: {
    flex: 1
  }
})
