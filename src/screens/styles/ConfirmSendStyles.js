/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { StyleSheet } from 'react-native'
import colors from 'utils/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', // TODO: to repace it with a color from global colors
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingTop: 40, // why not 20? Dunno, there is 40 in prototype.
  },
  lightGreyText: {
    color: colors.greySub,
  },
})

export default styles
