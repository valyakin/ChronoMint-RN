import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import Text from 'src/components/Text'
import styles from './styles'


export default class Checkbox extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    theme: PropTypes.string,
    isChecked: PropTypes.boolean,
    onPress: PropTypes.func
  }

  render () {
    const { label, isChecked, onPress } = this.props

    const theme = styles(this.props.theme)
    
    return (
      <View
        style={theme.container}
        onPress={onPress}
      >
        <Image
          source={isChecked ?
            require('src/assets/icons/checkbox-checked.png') :
            require('src/assets/icons/checkbox.png')
          }
          style={theme.checkboxContainer}
        />
        <Text
          style={theme.label}
        >
          {label}
        </Text>
      </View>
    )
  }
}
