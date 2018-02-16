/* @flow */
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { UNIT } from '../constants/styles'

const Icon = ({ source, style }: any) => (
  <View
    style={[
      styles.container,
      style,
    ]}
  >
    <Image
      source={source}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: 3 * UNIT,
    height: 3 * UNIT,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Icon
