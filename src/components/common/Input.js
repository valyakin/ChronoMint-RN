import React from 'react'
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native'
import Text from './Text'
import {
  FOREGROUND,
  FOREGROUND_LIGHTEST,
  FOREGROUND_LIGHT
} from '../../styles'
import * as Animatable from 'react-native-animatable'

export default class Input extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isFocused: false
    }
  }

  handleFocus = () => {
    this.setState({ isFocused: true })
  }

  handleBlur = () => {
    this.setState({ isFocused: false })
  }

  render () {
    const { label } = this.props
    const { isFocused } = this.state

    return (
      <View>
        <TextInput
          style={style.input}
          defaultValue="sdfsdf"
          onFocus={this.handleFocus}
        />
        {/* <Animatable.Text
          transition="color"
          style={ isFocused ? style.labelActive : style.label }
        >
          { label }
        </Animatable.Text> */}
      </View>
    )
  }
}

const style = StyleSheet.create({
  label: {
    color: FOREGROUND_LIGHT,
    position: 'absolute'
  },
  labelActive: {
    color: FOREGROUND
  },
  input: {
    height: 20,
    borderBottomWidth: 1,
    borderBottomColor: FOREGROUND_LIGHTEST,
  }
})
