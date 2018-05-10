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
  navigator: any,
  onSetUsePinProtection: (value: boolean) => void,
  usePinProtection: boolean,
  onLogin: () => void,
  mnemonic: string,
}

class WalletBackupContainer extends PureComponent<TWalletBackupContainerProps, {}> {
  handleDone = () => {
    this.props.navigator.push({
      screen: 'GenerateMnemonic',
      title: I18n.t('GenerateMnemonic.title'),
      passProps: {
        mnemonic: this.props.mnemonic,
      },
    })
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
