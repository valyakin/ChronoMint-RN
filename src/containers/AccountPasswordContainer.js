/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import isValid from '../utils/validators'
import AccountPassword from '../screens/AccountPassword'

export type TAccount = {
  accountImage: any,
  address: string,
}

export type AccountPasswordContainerProps = {
  navigator: any
}

type AccountPasswordContainerState = {
  password: string,
}

class AccountPasswordContainer extends PureComponent<AccountPasswordContainerProps, AccountPasswordContainerState> {
  static navigatorStyle = {
    navBarHidden: true,
  }

  state = {
    password: '',
  }

  handleChangePassword = (password: string) => {
    this.setState({ password })
  }
  
  handleLogin = () => {
    const { password } = this.state
    if (!isValid.password(password)) {
      this.addError(I18n.t('AccountPassword.invalidPasswordError'))
    }

    this.props.navigator.push({
      screen: 'WalletsList',
      title: I18n.t('WalletsList.title'),
    })
  }
  
  handleSelectLanguage = () => {
    this.props.navigator.push({
      screen: 'SelectLanguage',
    })
  }

  handleSelectNetwork = () => {
    this.props.navigator.push({
      screen: 'SelectNetwork',
    })
  }

  handleUseWallet = () => {
    this.props.navigator.push({ screen: 'SelectAccount' })
  }

  addError = (error: string) => {
    alert(error)
  }

  render () {
    return (<AccountPassword
      accounts={accounts}
      onChangePassword={this.handleChangePassword}
      onLogin={this.handleLogin}
      onSelectLanguage={this.handleSelectLanguage}
      onSelectNetwork={this.handleSelectNetwork}
      onUseWallet={this.handleUseWallet}
    />)
  }
}

export default AccountPasswordContainer

const accounts = [{
  id: '1',
  address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
  accountImage: require('../images/profile-photo-1.jpg'),
}]
