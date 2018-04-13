/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import I18n from 'react-native-i18n'
import withLogin from '../components/withLogin'
import Input from '../components/Input'
import isValid from '../utils/validators'
import PrimaryButton from '../components/PrimaryButton'
import TextButton from '../components/TextButton'

class CreateWallet extends React.Component<CreateWalletProps, CreateWalletState> {
  static navigatorStyle = {
    navBarHidden: true,
  }

  state = {
    password: '',
    passwordConfirmation: '',
  }

  handleSelectNetwork = () => {
    this.props.navigator.push({
      screen: 'SelectNetwork',
    })
  }

  handleSelectLanguage = () => {
    this.props.navigator.push({
      screen: 'SelectLanguage',
    })
  }

  handleChangePassword = (password: string) => {
    this.setState({ password })
  }

  handleChangePasswordConfirmation = (passwordConfirmation: string) => {
    this.setState({ passwordConfirmation })
  }

  handleCreateWallet = async () => {
    const { password, passwordConfirmation } = this.state

    if (password !== passwordConfirmation) {
      return this.addError(I18n.t('CreateWallet.mismatchPasswords'))
    }
    if (!isValid.password(password) || !isValid.password(passwordConfirmation)) {
      return this.addError(I18n.t('CreateWallet.invalidPassword'))
    }

    this.props.navigator.push({
      screen: 'WalletBackup',
      passProps: {
        mnemonic: this.props.generateMnemonic(),
      },
    })
  }

  handleUseWallet = () => {
    this.props.navigator.push({
      screen: 'SelectAccount',
      title: I18n.t('SelectAccount.title'),
    })
  }

  handleWallet = () => {
    this.props.navigator.push({
      screen: 'WalletsList',
    })
  }

  addError = (error: string) => {
    alert(error)
  }

  render () {
    return (
      <View>
        <View style={styles.topBarActions}>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={this.handleSelectNetwork}
          >
            <Image
              style={styles.topBarButtonImage}
              source={require('../images/ios-gear-outline.png')}
            />
            <Text style={styles.topBarButtonLabel} >Production</Text >
          </TouchableOpacity >
          <View style={styles.spacer} />
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={this.handleSelectLanguage}
          >
            <Text style={styles.topBarButtonLabel} >EN-US</Text >
          </TouchableOpacity >
        </View>
        <Image
          source={require('../images/ChronoWalletIcon.png')}
          style={styles.logo}
        />
        <Image
          source={require('../images/ChronoWalletText.png')}
          style={styles.logoText}
        />
        <Input
          placeholder={I18n.t('CreateWallet.password')}
          style={styles.input}
          secureTextEntry
          onChangeText={this.handleChangePassword}
          autoCorrect={false}
        />
        <Input
          placeholder={I18n.t('CreateWallet.confirmPassword')}
          style={styles.input}
          secureTextEntry
          onChangeText={this.handleChangePasswordConfirmation}
          autoCorrect={false}
        />
        <PrimaryButton
          label={I18n.t('CreateWallet.createWallet').toUpperCase()}
          onPress={this.handleCreateWallet}
        />
        <Text style={styles.or}>
          {I18n.t('CreateWallet.or')}
        </Text>
        <TextButton
          label={I18n.t('CreateWallet.useExistingWallet')}
          onPress={this.handleUseWallet}
        />
        <Text style={styles.copyright}>
          {I18n.t('CreateWallet.copyright')}
        </Text>
      </View>
    )
  }
}

export default withLogin(CreateWallet)

type CreateWalletProps = {
  navigator: {
    push: (settings: NavigatorPushSettings) => {}
  },
  generateMnemonic (): void
}

type CreateWalletState = {
  password: string,
  passwordConfirmation: string,
}

type NavigatorPushSettings = {
  screen: string,
  title?: string
}

const styles = StyleSheet.create({
  topBarButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarActions: {
    flexDirection: 'row',
    margin: 20,
    top: -44,
  },
  spacer: {
    flex: 1,
  },
  topBarButtonImage: {
    tintColor: '#ffffff',
    marginRight: 10,
  },
  topBarButtonLabel: {
    color: '#FFFFFF',
  },
  logo: {
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
  logoText: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    margin: 20,
    textAlign: 'center',
  },
  or: {
    color: '#A3A3CC',
    alignSelf: 'center',
    fontSize: 16,
  },
  copyright: {
    color: '#9997B2',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    marginVertical: 30,
  },
})
