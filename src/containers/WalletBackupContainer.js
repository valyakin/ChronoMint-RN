/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import withLogin from '../components/withLogin'
import WalletBackup from '../screens/WalletBackup'

type TWalletBackupContainerProps = {
  isCreatingNewWallet?: boolean,
  mnemonic: string,
  privateKey?: string,
  navigator: any,
  password: string,
  onLogin: () => void,
  onSetUsePinProtection: (value: boolean) => void,
  usePinProtection: boolean,
}

class WalletBackupContainer extends PureComponent<TWalletBackupContainerProps, {}> {
  handleDone = () => {
    const {
      isCreatingNewWallet,
      onLogin,
      usePinProtection,
      mnemonic,
      privateKey,
      password,
    } = this.props

    if (isCreatingNewWallet) {
      return this.props.navigator.push({
        screen: 'GenerateMnemonic',
        title: I18n.t('GenerateMnemonic.title'),
        passProps: {
          mnemonic,
          privateKey,
          password,
        },
      })
    }

    if (usePinProtection) {
      const {
        mnemonic,
        privateKey,
        password,
      } = this.props

      return this.props.navigator.push({
        screen: 'EnterPin',
        title: 'Enter PIN',
        passProps: {
          mnemonic,
          privateKey,
          password,
        },
      })
    }

    onLogin()
  }

  render () {
    return (<WalletBackup
      onDone={this.handleDone}
      onLater={this.props.onLogin}
      onSwitchUsePinProtection={this.props.onSetUsePinProtection}
      usePinProtection={this.props.usePinProtection}
    />)
  }
}

export default withLogin(WalletBackupContainer)
