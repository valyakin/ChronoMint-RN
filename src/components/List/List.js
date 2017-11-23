/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, SectionList } from 'react-native'
import Separator from './components/Separator'
import ListItem from './components/ListItem'
import SectionHeader from './components/SectionHeader'
import styles from './styles'

export default class List extends React.Component {
  static propTypes = {
    sections: PropTypes.array,
    data: PropTypes.array,
    theme: PropTypes.oneOf(['dark', 'light'])
  }

  renderItem = ({ item }) => (
    <ListItem
      {...item}
      title={item.key}
      theme={this.props.theme}
    />
  )

  renderSeparator = () => <Separator theme={this.props.theme} />

  renderSectionHeader = ({ section }) => {
    return section.hasOwnProperty('title') ? (
      <SectionHeader title={section.title} />
    ) : null
  }

  render () {
    const theme = styles(this.props.theme)

    return this.props.sections ? (
      <SectionList
        style={theme.list}
        sections={this.props.sections}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ItemSeparatorComponent={this.renderSeparator}
      />
    ) : (
      <FlatList
        style={theme.list}
        sections={this.props.sections}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }
}
