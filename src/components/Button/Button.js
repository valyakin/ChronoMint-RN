import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'src/components/Icon'
import Text from 'src/components/Text'
import styles from './styles'

export default class Button extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.any,
    theme: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    iconPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
  }

  renderLeftSection = () => {
    const { iconPosition } = this.props
    const theme = styles(this.props.theme)

    if (iconPosition === 'left' || typeof iconPosition === 'undefined') {
      return (
        <View style={theme.leftSection}>
          {this.renderIcon()}
        </View>
      )
    }
  }

  renderRightSection = () => {
    const { iconPosition } = this.props
    const theme = styles(this.props.theme)

    if (iconPosition === 'right') {
      return (
        <View style={theme.rightSection}>
          {this.renderIcon()}
        </View>
      )
    }
  }

  renderLabel = () => {
    const { label } = this.props
    const theme = styles(this.props.theme)

    if (label) {
      return (
        <Text
          style={theme.label}
        >
          {label}
        </Text>
      )
    }
  }

  renderIcon = () => (
    this.props.icon && <Icon source={this.props.icon} />
  )

  render () {
    const { onPress, style } = this.props
    const theme = styles(this.props.theme)

    return (
      <TouchableOpacity
        style={[
          theme.container,
          style
        ]}
        onPress={onPress}
      >
        {this.renderLeftSection()}
        {this.renderLabel()}
      </TouchableOpacity>
    )
  }
}
