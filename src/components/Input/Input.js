import React from 'react'
import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'
import Text from '../../components/Text'
import styles from './styles'

export default class Input extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    theme: PropTypes.string,
    style: PropTypes.any,
  }
  
  render () {
    const { label, isDark, style, ...restProps } = this.props

    return (
      <View
        style={[
          isDark ? styles.containerDark : styles.container,
          style,
        ]}
      >
        <Text style={isDark ? styles.labelDark : styles.label}>{label}</Text>
        <TextInput
          style={isDark ? styles.inputDark : styles.input}
          {...restProps}
        />
      </View>
    )
  }
}
