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
  item: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  itemText: {
    flexShrink: 1,
    marginHorizontal: 8,
    fontSize: 13,
  },
  receiving: {
    color: colors.green,
  },
  sending: {
    color: colors.foreground,
  },
})

export default styles
