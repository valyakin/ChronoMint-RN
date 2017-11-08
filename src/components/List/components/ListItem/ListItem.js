/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Switch } from 'react-native'
import Text from 'src/components/Text'
import Icon from 'src/components/Icon'
import styles from './styles'

export default class ListItem extends React.Component {
  static propTypes = {
    theme: PropTypes.oneOf(['dark', 'light']),
    title: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.node
    ]),
    isChecked: PropTypes.bool,
    value: PropTypes.string,
    hasArrow: PropTypes.bool,
    switchOptions: PropTypes.object
  }

  renderLeft = () => {
    const { icon } = this.props

    if (this.props.hasOwnProperty('isChecked')) {
      return <Icon source={require('src/assets/icons/check.png')} />
    }
    if (icon && icon.prototype && icon.prototype.isReactComponent) {
      return icon
    }
    if (icon) {
      return <Icon source={icon} />
    }
  }

  renderRight = () => {
    const { value, hasArrow, switchOptions } = this.props
    const theme = styles(this.props.theme)

    if (value) {
      return <Text>{value}</Text>
    }
    if (hasArrow) {
      return (
        <Icon
          source={require('src/assets/icons/chevron-right.png')}
          style={theme.arrow}
        />
      )
    }
    if (typeof switchOptions === 'object') {
      return <Switch {...switchOptions} />
    }
  }

  render () {
    const { title, onPress } = this.props

    const theme = styles(this.props.theme)

    return (
      <TouchableOpacity style={theme.container} onPress={onPress}>
        <View style={theme.leftSection}>{this.renderLeft()}</View>
        <Text style={theme.text}>{title}</Text>
        <View style={theme.rightSection} >{this.renderRight()}</View>
      </TouchableOpacity>
    )
  }
}

