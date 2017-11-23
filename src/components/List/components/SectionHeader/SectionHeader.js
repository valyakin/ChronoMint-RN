/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Text from 'src/components/Text'
import styles from './styles'

export default class SectionHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    theme: PropTypes.string
  }

  render () {
    const { title } = this.props
    const theme = styles(this.props.theme)

    return (
      <View style={theme.sectionHeader}>
        <Text>
          {title}
        </Text>
      </View>
    )
  }
}
