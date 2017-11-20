/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Text from 'src/components/Text'
import Spacer from 'src/components/Spacer'
import Icon from 'src/components/Icon'
import isDefined from 'src/utils/isDefined'
import styles from './styles'

export default class ListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    theme: PropTypes.oneOf(['dark', 'light'])
  }

  render () {
    const { key, icon, hasArrow, value, onPress } = this.props.item

    const theme = styles(this.props.theme)

    return (
      <View
        style={theme.container}
        onPress={onPress}
      >
        { icon && (
          <Icon
            style={theme.icon}
            source={icon}
          />
        )}
        <Text
          style={theme.text}
        >
          {key}
        </Text>
        <Spacer />
        { isDefined(value) && <Text>{value}</Text>}
        { hasArrow && (
          <Icon
            source={require('src/assets/icons/chevron-right.png')}
            style={theme.arrow}
          />
        )}
      </View>
    )
  }
}
