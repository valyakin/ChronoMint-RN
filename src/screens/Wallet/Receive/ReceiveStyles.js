/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../../common/colors'
import { headerHeight } from '../../../common/constants/screens'

export default StyleSheet.create({
  screenView: {
    flex: 1,
    marginTop: headerHeight,
    backgroundColor: colors.light,
    flexDirection: 'column',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  qrSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingBottom: 20,
  },
  warning: {
    flex: 1,
    flexDirection: 'column',
  },
  warningText: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  bold: {
    fontWeight: 'bold',
  },
  separator: {
    backgroundColor: colors.primary,
  },
  image: {
    margin: 16,
  },
  copyImage: {
    width: 32,
    height: 32,
    marginRight: 20,
  },
})
