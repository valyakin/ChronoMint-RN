/* @flow */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Checkbox from '../../../components/Checkbox'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import LoginScreenLayout from '../LoginScreenLayout'
import screenLayout from '../../../utils/screenLayout'
import strings from './strings'
import styles from './styles'

class EnterPrivate extends React.Component<{}, {}> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle,
  }

  state = {
    privateKey: '',
    isPending: false,
  }
  
  handlePress = () => {
    this.setState({ isPending: true })
    this.props.onLogin(this.state.privateKey)
  }

  handleInput = (privateKey) => {
    this.setState({ privateKey })
  }

  render () {
    return (
      <View>
        <Input
          label={strings.private}
          style={styles.input}
          multiline
          isDark
          onChangeText={this.handleInput}
        />
        <Checkbox
          label={strings.saveOnDevice}
          isDark
        />
        <View 
          style={styles.actions}
        >
          { this.state.isPending ? 
            <ActivityIndicator /> :
            <Button
              label={strings.login}
              isDark
              onPress={this.handlePress}
            />
          }
        </View>
      </View>
    )
  }
}

export default screenLayout(LoginScreenLayout)(EnterPrivate)
