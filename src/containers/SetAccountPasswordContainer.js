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
import SetAccountPassword from '../screens/SetAccountPassword'

type TSetAccountPasswordContainerProps = {
  generateMnemonic: () => void,
  isCreatingNewWallet?: boolean,
  lastAccount: any,
  navigator: any,
  privateKey?: string,
}

type TSetAccountPasswordContainerState = {
  password: string,
  passwordConfirmation: string,
}

class SetAccountPasswordContainer extends PureComponent<TSetAccountPasswordContainerProps, TSetAccountPasswordContainerState> {
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

  handleDone = () => {
    const {
      privateKey,
      generateMnemonic,
    } = this.props
    let mnemonic

    const { password, passwordConfirmation } = this.state

    if (password !== passwordConfirmation) {
      return this.addError(I18n.t('CreateWallet.mismatchPasswords'))
    }
    if (!isValid.password(password) || !isValid.password(passwordConfirmation)) {
      return this.addError(I18n.t('CreateWallet.invalidPassword'))
    }

    if (!privateKey) {
      mnemonic = generateMnemonic()
    }

    this.props.navigator.push({
      screen: 'WalletBackup',
      passProps: {
        mnemonic,
        privateKey,
        password,
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

  handleLastAccount = () => {
    this.props.navigator.resetTo({
      screen: 'EnterPin',
      title: 'EnterPin',
      passProps: {
        isLogin: true,
        account: this.props.lastAccount,
      },
    })
  }

  render () {
    if (this.props.lastAccount) {
      this.handleLastAccount()
    }

    return (
      <SetAccountPassword
        isCreatingNewWallet={this.props.isCreatingNewWallet}
        onChangePassword={this.handleChangePassword}
        onChangePasswordConfirmation={this.handleChangePasswordConfirmation}
        onDone={this.handleDone}
        onSelectLanguage={this.handleSelectLanguage}
        onSelectNetwork={this.handleSelectNetwork}
        onUseWallet={this.handleUseWallet}
      />
    )
  }
}

export default withLogin(SetAccountPasswordContainer)
