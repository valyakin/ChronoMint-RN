/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import colors from '../utils/colors'

type Props = {
  label?: string,
  isDark?: boolean,
  style?: StyleObj
}

const Input = ({ label, isDark, style, ...restProps }: Props) => (
  <View
    style={[
      isDark ? styles.containerDark : styles.container,
      style,
    ]}
  >
    <Text style={isDark ? styles.labelDark : styles.label}>{label}</Text>
    <TextInput
      style={isDark ? styles.inputDark : styles.input}
      {...restProps}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  containerDark: {
    padding: 8,
    backgroundColor: colors.backgroundDim,
  },
  label: {
    fontSize: 12,
  },
  labelDark: {
    fontSize: 12,
    color: colors.backgroundLight,
    opacity: .8,
  },
  input: {
    fontSize: 14,
  },
  inputDark: {
    fontSize: 14,
    color: colors.backgroundLight,
  },
})

export default Input
