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
  containerVertical: {
    flexDirection: 'column',
    paddingBottom: 20,
  },
  containerHorizonatal: {
    flexDirection: 'row',
  },
  containerVerticalReverse: {
    flexDirection: 'column-reverse',
    paddingBottom: 20,
  },
  containerHorizonatalReverse: {
    flexDirection: 'row-reverse',
  },
  defaultTextColor: {
    color: colors.mainGrey,
  },
  currencyTextColor: {
    color: colors.activeBlue,
  },
})

export default styles
