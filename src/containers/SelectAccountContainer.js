/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import SelectAccount, { type TAccount } from '../screens/SelectAccount'

type SelectAccountContainerProps = {
  navigator: any,
}

class SelectAccountContainer extends PureComponent<SelectAccountContainerProps> {
  handleCreateWallet = () => {
    this.props.navigator.resetTo({ screen: 'CreateWallet' })
  }

  handleImportAccount = () => {
    this.props.navigator.push({
      screen: 'AccountImportMethod',
      title: I18n.t('ImportAccount.title'),
    })
  }

  handleSelectAccount = (account: TAccount) => () => {
    this.props.navigator.push({
      screen: 'AccountPassword',
      title: 'AccountPassword.title',
      passProps: {
        account,
      },
    })
  }

  render () {
    return (<SelectAccount
      accounts={[]}
      onCreateWallet={this.handleCreateWallet}
      onImportAccount={this.handleImportAccount}
      onSelectAccount={this.handleSelectAccount}
    />)
  }
}

export default SelectAccountContainer
