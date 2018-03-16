/* @flow */
import React from 'react'
import { Image, TouchableOpacity, StyleSheet, Text } from 'react-native'
import images from '../assets/images'
import colors from '../utils/colors'

type Props = {
  label: string,
  isDark?: boolean,
  isChecked?: boolean,
  onPress?: () => void
}

const checkboxIcon = (isChecked) => {
  return isChecked ?
    images.checkboxChecked :
    images.checkbox
}

const Checkbox = ({ label, isDark, isChecked, onPress }: Props) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={1}
    onPress={onPress}
  >
    <Image
      source={checkboxIcon(isChecked)}
      style={styles.checkboxContainer}
    />
    <Text
      style={isDark ? styles.labelDark : styles.label}
    >
      {label}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.foreground,
  },
  labelDark: {
    color: colors.backgroundLight,
  },
  checkboxContainer: {
    marginRight: 8,
  },
})

export default Checkbox
