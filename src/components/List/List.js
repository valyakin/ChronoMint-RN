/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import styles from './styles'
import isDefined from 'src/utils/isDefined'
import { Spacer } from '../Spacer/Spacer';
import { Text } from '../Text/Text';

class ListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    theme: PropTypes.oneOf(['dark', 'light'])
  }

  render () {
    const { key, icon, hasChevron, value, onPress } = this.props.item
    console

    const theme = styles(this.props.theme)

    return (
      <Icon
      <View
        style={theme.itemContainer}
        onPress={onPress}
      >
        { icon && (
          <Icon
            style={theme.itemIcon}
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
        { hasChevron && <Icon source={require('@icons/chevron-right.png')} />}
      </View>
    )
  }
}

export default class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    theme: PropTypes.oneOf(['dark', 'light'])
  }

  render () {
    const { theme } = this.props

    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item }) => <ListItem item={item} theme={theme} />}
      />
    )
  }
}
