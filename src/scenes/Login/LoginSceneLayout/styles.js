/* @flow */
import { StyleSheet, Platform } from 'react-native'
import { BACKGROUND, UNIT } from 'src/constants/styles'

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
    marginBottom: UNIT,
    color: BACKGROUND,
    alignSelf: 'flex-start'
  },
  subtitle: {
    color: BACKGROUND,
    marginHorizontal: 2 * UNIT,
    marginVertical: UNIT,
    lineHeight: 30,
    alignSelf: 'flex-start',
    opacity: .6,
    fontSize: 20
  },
  fetchingIndicator: {
    alignSelf: 'flex-start'
  },
  contentArea: {
    flex: 1
  }
})
