/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import Button from '../components/Button'
import LoginScreenLayout from './LoginScreenLayout'
import screenLayout from '../utils/screenLayout'

type Props = {
  wallet: {},
  onLogin: (wallet: {}, password: string) => void
}

type State = {
  password: string,
  isPending: boolean
}

class EnterWalletPassword extends React.Component<Props, State> {
  static screenOptions = {
    title: I18n.t('EnterWalletPassword.title'),
    subtitle: I18n.t('EnterWalletPassword.subtitle'),
  }

  state = {
    password: '',
    isPending: false,
  }
  
  handlePress = () => {
    this.setState({ isPending: true })
    this.props.onLogin(this.props.wallet, this.state.password)
  }

  handleInput = (password) => {
    this.setState({ password })
  }

  render () {
    return (
      <View>
        <Input
          label={I18n.t('EnterWalletPassword.private')}
          style={styles.input}
          multiline
          isDark
          onChangeText={this.handleInput}
        />
        <Checkbox
          label={I18n.t('EnterWalletPassword.saveOnDevice')}
          isDark
        />
        <View 
          style={styles.actions}
        >
          { this.state.isPending ? 
            <ActivityIndicator /> :
            <Button
              label={I18n.t('EnterWalletPassword.login')}
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

export default screenLayout(LoginScreenLayout)(EnterWalletPassword)
