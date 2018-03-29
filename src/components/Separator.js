/* @flow */
import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from '../utils/colors'

const Separator = ({ style }) => <View style={[styles.separator, style ]} />

export default Separator

// noinspection JSSuspiciousNameCombination
const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.gray,
    minHeight: StyleSheet.hairlineWidth,
    minWidth: StyleSheet.hairlineWidth,
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch',
  },
})
