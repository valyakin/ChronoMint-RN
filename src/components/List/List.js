/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { Text, Icon } from '@components'
import styles from './styles'

const isDefined = (variable) => typeof variable !== 'undefined'

const Spacer = () => (
  <View style={styles.spacer} />
)

class ListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object
  }

  render () {
    const { key, icon, hasChevron, value, onPress } = this.props.item

    return (
      <View
        style={styles.itemContainer}
        onPress={onPress}
      >
        { icon && (
          <Icon
            style={styles.itemIcon}
            source={icon}
          />
        )}
        <Text>{key}</Text>
        <Spacer />
        { isDefined(value) && <Text>{value}</Text>}
        { hasChevron && <Icon source={require('@icons/chevron-right.png')} />}
      </View>
    )
  }
}

export default class List extends React.Component {
  static propTypes = {
    data: PropTypes.array
  }

  render () {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    )
  }
}
