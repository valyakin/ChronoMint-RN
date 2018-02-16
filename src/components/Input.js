/* @flow */
import React from 'react'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { View, TextInput, StyleSheet } from 'react-native'
import { UNIT, COLOR_BACKGROUND_LIGHT, COLOR_BACKGROUND_DIM } from '../constants/styles'
import Text from './Text'

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
    padding: UNIT,
  },
  containerDark: {
    padding: UNIT,
    backgroundColor: COLOR_BACKGROUND_DIM,
  },
  label: {
    fontSize: 12,
  },
  labelDark: {
    fontSize: 12,
    color: COLOR_BACKGROUND_LIGHT,
    opacity: .8,
  },
  input: {
    fontSize: 14,
  },
  inputDark: {
    fontSize: 14,
    color: COLOR_BACKGROUND_LIGHT,
  },
})

export default Input
