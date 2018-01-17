// @flow
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import Text from '../Text'
import styles from './styles'

type CheckboxProps = {
  label: string,
  isDark?: boolean,
  isChecked?: boolean,
  onPress?: () => void
}

const Checkbox = (props: CheckboxProps) => {
  const { label, isChecked, onPress, isDark } = props
  
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}
    >
      <Image
        source={isChecked ?
          require('../../assets/icons/checkbox-checked.png') :
          require('../../assets/icons/checkbox.png')
        }
        style={styles.checkboxContainer}
      />
      <Text
        style={isDark ? styles.labelDark : styles.label}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default Checkbox
