/* @flow */
import React from 'react'
import { FlatList, SectionList, View, Text } from 'react-native'
import ListItem from './components/ListItem'
import styles from './styles'

type Props = {
  isDark?: boolean,
}

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text>
      {title}
    </Text>
  </View>
)

export default class List extends React.Component<Props, {}> {

  renderItem = ({ item }) => (
    <ListItem
      {...item}
      title={item.key}
      isDark={this.props.isDark}
    />
  )
  renderSectionHeader = ({ section }) => {
    return section.hasOwnProperty('title') ? (
      <SectionHeader title={section.title} />
    ) : null
  }

  render () {
    const { isDark } = this.props

    return this.props.sections ? (
      <SectionList
        style={isDark ? styles.listDark : styles.list}
        sections={this.props.sections}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
      />
    ) : (
      <FlatList
        style={isDark ? styles.listDark : styles.list}
        data={this.props.data}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }
}

