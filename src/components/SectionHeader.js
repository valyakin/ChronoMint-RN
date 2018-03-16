/* @flow */
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from '../utils/colors'

type Props = {
  title: string
}

export default class SectionHeader extends React.Component<Props, void> {
  render () {
    return (
      <Text style={styles.title}>
        {this.props.title.toUpperCase()}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.background,
    backgroundColor: colors.foreground,
    fontWeight: '900',
  },
})
