/* @flow */
import React from 'react'
import type { TextProps } from 'react-native/Libraries/Text/TextProps'
import { Text as RNText, StyleSheet } from 'react-native'
import { LINE, COLOR_TRANSPARENT } from '../constants/styles'

const Text = (props: TextProps) => (
  <RNText
    {...props}
    style={[
      styles.text,
      props.style,
    ]}
  >
    {props.children}
  </RNText>
)

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Clear Sans',
    lineHeight: LINE,
    backgroundColor: COLOR_TRANSPARENT,
  },
})

export default Text
