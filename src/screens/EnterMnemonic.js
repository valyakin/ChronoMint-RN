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
import colors from '../utils/colors'

type Props = {
  navigator: {
    push: (Object) => void
  }
}

type State = {
  mnemonic: string
}

class EnterMnemonic extends React.Component<Props, State> {
  static screenOptions = {
    title: I18n.t('EnterMnemonic.title'),
    subtitle: I18n.t('EnterMnemonic.subtitle'),
  }

  state = {
    mnemonic: '',
    isPending: false,
  }

  handleLogin = () => {
    this.setState({ isPending: true })
    this.props.onLogin(this.state.mnemonic)
  }

  handleMnemonicChange = (mnemonic) => {
    this.setState({ mnemonic })
  }

  handleGenerateMnemonic = () => {
    this.props.navigator.push({
      screen: 'Login.GenerateMnemonic',
      backButtonTitle: 'Mnemonic',
    })
  }
  
  render () {
    return (
      <View>
        <Input
          isDark
          label={I18n.t('EnterMnemonic.mnemonic')}
          style={styles.input}
          multiline
          onChangeText={this.handleMnemonicChange}
        />
        <Checkbox
          isDark
          label={I18n.t('EnterMnemonic.saveOnDevice')}
        />
        <View 
          style={styles.actions}
        >
          { this.state.isPending ? 
            <ActivityIndicator /> :
            <Button
              isDark
              label={I18n.t('EnterMnemonic.login')}
              onPress={this.handleLogin}
            />
          }
          <Button
            isDark
            icon={require('../images/mnemonic.png')}
            style={styles.generateButton}
            label={I18n.t('EnterMnemonic.generateMnemonic')}
            onPress={this.handleGenerateMnemonic}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actions: {
    margin: 16,
  },
  input: {
    height: 80,
  },
  generateButton: {
    backgroundColor: colors.transparent,
  },
})

export default screenLayout(LoginScreenLayout)(EnterMnemonic)
