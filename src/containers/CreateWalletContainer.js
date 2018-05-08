/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import withLogin from '../components/withLogin'
import isValid from '../utils/validators'
import CreateWallet from '../screens/CreateWallet'

type CreateWalletContainerProps = {
  navigator: any,
  generateMnemonic: () => void
}

type CreateWalletContainerState = {
  password: string,
  passwordConfirmation: string,
}

class CreateWalletContainer extends PureComponent<CreateWalletContainerProps, CreateWalletContainerState> {
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

  handleCreateWallet = () => {
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
      <CreateWallet
        onChangePassword={this.handleChangePassword}
        onChangePasswordConfirmation={this.handleChangePasswordConfirmation}
        onCreateWallet={this.handleCreateWallet}
        onSelectLanguage={this.handleSelectLanguage}
        onSelectNetwork={this.handleSelectNetwork}
        onUseWallet={this.handleUseWallet}
      />
    )
  }
}

export default withLogin(CreateWalletContainer)
