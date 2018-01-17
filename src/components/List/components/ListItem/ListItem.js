/* @flow */
import React from 'react'
import { View, TouchableOpacity, Switch } from 'react-native'
import Text from '../../../../components/Text'
import Icon from '../../../../components/Icon'
import styles from './styles'

type Props = {
  icon?: number,
  value?: string,
  hasArrow?: boolean,
  switchOptions?: Object,
  title?: string,
  isDark?: boolean,
  onPress?: () => void
}

export default class ListItem extends React.Component<Props, {}> {
  renderLeft = () => {
    const { icon } = this.props

    if (this.props.isChecked) {
      return <Icon source={require('../../../../assets/icons/check.png')} />
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

    if (value) {
      return <Text>{value}</Text>
    }
    if (hasArrow) {
      return (
        <Icon
          source={require('../../../../assets/icons/chevron-right.png')}
          style={styles.arrow}
        />
      )
    }
    if (typeof switchOptions === 'object') {
      return <Switch {...switchOptions} />
    }
  }

  render () {
    const { title, onPress, isDark } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.leftSection}>{this.renderLeft()}</View>
        <Text style={isDark ? styles.textDark : styles.text}>{title}</Text>
        <View style={styles.rightSection} >{this.renderRight()}</View>
      </TouchableOpacity>
    )
  }
}

