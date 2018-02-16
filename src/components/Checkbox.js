/* @flow */
import React from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import { COLOR_BACKGROUND_LIGHT, UNIT, COLOR_FOREGROUND } from '../constants/styles'
import Text from './Text'

type Props = {
  label: string,
  isDark?: boolean,
  isChecked?: boolean,
  onPress?: () => void
}

const checkboxIcon = (isChecked) => {
  return isChecked ?
    require('../assets/icons/checkbox-checked.png') :
    require('../assets/icons/checkbox.png')
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
    padding: UNIT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: COLOR_FOREGROUND,
  },
  labelDark: {
    color: COLOR_BACKGROUND_LIGHT,
  },
  checkboxContainer: {
    marginRight: UNIT,
  },
})

export default Checkbox
