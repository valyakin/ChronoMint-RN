// @flow
import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { UNIT, COLOR_BACKGROUND_LIGHT, COLOR_FOREGROUND, LINE } from '../constants/styles'
import Icon from './Icon'
import Text from './Text'

type IconPosition = 'left' | 'right' | 'top' | 'bottom'

type LeftSectionProps = {
  icon?: number,
  iconPosition?: IconPosition
}

const LeftSection = (props: LeftSectionProps) => {
  const { icon, iconPosition } = props

  if (!icon) {
    return null
  }

  if (iconPosition && iconPosition !== 'left') {
    return null
  }

  return (
    <View style={styles.leftSection}>
      {icon && <Icon source={icon} />}
    </View>
  )
}

type LabelProps = {
  label?: string,
  isDark?: boolean
}

const Label = (props: LabelProps) => {
  const { label, isDark } = props

  if (!label) {
    return null
  }

  return (
    <Text style={isDark ? styles.labelDark : styles.label}>
      {label}
    </Text>
  )
}

type Props = {
  label?: string,
  icon?: number,
  isDark?: boolean,
  isDisabled?: boolean,
  onPress?: (event: MouseEvent) => void,
  style?: {} | number,
  iconPosition?: IconPosition
}

class Button extends React.Component<Props, {}> {
  handlePress = (event: MouseEvent) => {
    const { isDisabled, onPress } = this.props

    if (isDisabled) {
      return
    }

    onPress && onPress(event)
  }

  render () {
    const { style, icon, iconPosition, label, isDark, isDisabled } = this.props
  
    return (
      <TouchableOpacity
        style={[
          styles.container,
          ( isDisabled && styles.containerDisabled ),
          style,
        ]}
        activeOpacity={isDisabled ? 1 : 0.2}
        onPress={this.handlePress}
      >
        <LeftSection icon={icon} iconPosition={iconPosition} />
        <Label label={label} isDark={isDark} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: UNIT,
    borderRadius: 10,
    backgroundColor: '#2962FF',
    paddingVertical: UNIT,
    paddingHorizontal: 4 * UNIT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDisabled: {
    backgroundColor: '#6A75BC',
  },
  leftSection: {
    marginRight: UNIT,
  },
  label: {
    color: COLOR_FOREGROUND,
    height: LINE,
  }, 
  labelDark: {
    color: COLOR_BACKGROUND_LIGHT,
    height: LINE,
  },
})

export default Button
