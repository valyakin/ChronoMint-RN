/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styles from './styles'

export default class Separator extends React.Component {
  static propTypes = {
    theme: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.theme = styles(props.theme)
  }
  
  render () {
    const theme = styles(this.props.theme)

    return (
      <View style={theme.separator} />
    )
  }
}
