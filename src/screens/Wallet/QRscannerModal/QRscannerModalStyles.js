/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../../common/colors'

export default StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
  },
  actions: {
    backgroundColor: colors.primary,
  },
  close: {
    alignSelf: 'flex-start',
    padding: 16,
  },
  closeText: {
    fontSize: 17,
    fontWeight: '500',
  },
  scannerWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  scanner: {
    flex: 1,
    flexDirection: 'row',
  },
})
