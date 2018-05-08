/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import AccountImportMethod, { type TAccountImportMethod } from '../screens/AccountImportMethod'

type AccountImportMethodContainerProps = {
  navigator: any,
}

class AccountImportMethodContainer extends PureComponent<AccountImportMethodContainerProps> {
  handleCreateWallet = () => {
    this.props.navigator.push({
      screen: 'CreateWallet',
    })
  }

  handleSelectAccountImportMethod = ({ screen, title }: TAccountImportMethod) => () => {
    this.props.navigator.push({
      screen,
      title,
    })
  }

  render () {
    return (<AccountImportMethod
      accountImportMethods={accountImportMethods}
      onCreateWallet={this.handleCreateWallet}
      onSelectAccountImportMethod={this.handleSelectAccountImportMethod}
    />)
  }
}

export default AccountImportMethodContainer

const accountImportMethods: Array<TAccountImportMethod> = [
  {
    id: 'mnemonic',
    screen: 'EnterMnemonic',
    title: 'Enter mnemonic to reset password',
    label: I18n.t('ImportAccount.mnemonic'),
    image: require('../images/mnemonic.png'),
  },
  {
    id: 'privateKey',
    screen: 'EnterPrivateKey',
    title: 'Enter private key',
    label: I18n.t('ImportAccount.privateKey'),
    image: require('../images/private-key.png'),
  },
]
