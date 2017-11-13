/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import isDefined from 'src/utils/isDefined'
import Spacer from 'src/components/Spacer'
import Text from 'src/components/Text'
import Icon from 'src/components/Icon'
import styles from './styles'

class ListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    theme: PropTypes.oneOf(['dark', 'light'])
  }

  render () {
    const { key, icon, hasChevron, value, onPress } = this.props.item

    const theme = styles(this.props.theme)

    return (
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
        { hasChevron && <Icon source={require('src/assets/icons/chevron-right.png')} />}
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
