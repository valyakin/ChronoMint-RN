/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  StyleSheet,
} from 'react-native'
import colors from 'utils/colors'

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 4,
  },
  actionIcon: {
    tintColor: colors.background,
  },
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  actionTitle: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  screenView: {
    flex: 1,
  },
  separator: {
    backgroundColor: colors.primary,
  },
  tabItem: {
    backgroundColor: '#4e3d99',
    color: colors.background,
    fontSize: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tabsContainer: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
})

export default styles
