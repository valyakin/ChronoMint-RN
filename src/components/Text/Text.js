/* @flow */
import React from 'react'
import { Text as RNText } from 'react-native'
import styles from './styles'

type TextProps = {
  children: string,
  style?: number | Object
}

const Text = (props: TextProps) => (
  <RNText
    {...props}
    style={[
      styles.text,
      props.style
    ]}
  >
    {props.children}
  </RNText>
)

export default Text
