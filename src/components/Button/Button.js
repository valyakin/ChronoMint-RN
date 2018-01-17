// @flow
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from '../Icon'
import Text from '../Text'
import styles from './styles'

type IconPosition = 'left' | 'right' | 'top' | 'bottom'

type LeftSectionProps = {
  icon?: number,
  iconPosition?: IconPosition
}

const LeftSection = (props: LeftSectionProps) => {
  const {icon, iconPosition} = props

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
  const {label, isDark} = props

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
          style
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

export default Button
