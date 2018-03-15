/* @flow */
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { COLOR_BACKGROUND, UNIT, COLOR_FOREGROUND } from '../../constants/styles'

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
    paddingHorizontal: 2 * UNIT,
    paddingVertical: 1.5 * UNIT,
    color: COLOR_BACKGROUND,
    backgroundColor: COLOR_FOREGROUND,
    fontWeight: '900',
  },
})
