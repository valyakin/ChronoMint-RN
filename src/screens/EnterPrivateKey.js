/* @flow */
import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import Button from '../components/Button'
import LoginScreenLayout from './LoginScreenLayout'
import screenLayout from '../utils/screenLayout'

const PRIVATE_KEY: string = __DEV__ ? '1111111111111111111111111111111111111111111111111111111111111111' : ''

class EnterPrivateKey extends React.Component<{}, {}> {
  static screenOptions = {
    title: I18n.t('EnterPrivateKey.title'),
    subtitle: I18n.t('EnterPrivateKey.subtitle'),
  }

  state = {
    privateKey: PRIVATE_KEY,
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
          label={I18n.t('EnterPrivateKey.private')}
          style={styles.input}
          multiline
          isDark
          onChangeText={this.handleInput}
          value={PRIVATE_KEY}
        />
        <Checkbox
          label={I18n.t('EnterPrivateKey.saveOnDevice')}
          isDark
        />
        <View 
          style={styles.actions}
        >
          { this.state.isPending ? 
            <ActivityIndicator /> :
            <Button
              label={I18n.t('EnterPrivateKey.login')}
              isDark
              onPress={this.handlePress}
            />
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 80,
  },
  actions: {
    margin: 16,
  },
})

export default screenLayout(LoginScreenLayout)(EnterPrivateKey)
