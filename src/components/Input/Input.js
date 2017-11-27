import React from 'react'
import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'
import Text from 'src/components/Text'
import styles from './styles'

export default class Input extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    theme: PropTypes.string,
    style: PropTypes.any
  }
  
  render () {
    const { label } = this.props
    const theme = styles(this.props.theme)

    return (
      <View
        style={[
          theme.container,
          this.props.style
        ]}
      >
        <Text style={theme.label}>{label}</Text>
        <TextInput style={theme.input} />
      </View>
    )
  }
}
