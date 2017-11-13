/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import Separator from './components/Separator'
import ListItem from './components/ListItem'
import styles from './styles'

export default class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    theme: PropTypes.oneOf(['dark', 'light'])
  }

  renderItem = ({ item }) => {
    return <ListItem
      item={item}
      theme={this.props.theme}
    />
  }

  renderSeparator = () => <Separator theme={this.props.theme} />

  render () {
    const theme = styles(this.props.theme)

    return (
      <FlatList
        style={theme.list}
        data={this.props.data}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }
}
