/* @flow */
import React from 'react'
import { List } from '@components'
import strings from './strings'
import screenLayout from 'src/screens/screenLayout'
import LoginScreenLayout from '../LoginScreenLayout'

@screenLayout(LoginScreenLayout)
export default class OptionSelector extends React.Component {
  static screenOptions = {
    title: strings.login,
    subtitle: strings.selectOptions
  }

  render () {
    return (
      <List
        theme='dark'
        data={[
          {
            key: strings.mnemonicKey,
            icon: require('src/assets/icons/mnemonic.png'),
            hasChevron: true
          },
          {
            key: strings.walletFile,
            icon: require('src/assets/icons/wallet.png'),
            hasChevron: true
          },
          {
            key: strings.privateKey,
            icon: require('src/assets/icons/key.png'),
            hasChevron: true
          },
          {
            key: strings.uPort,
            icon: require('src/assets/icons/uport.png'),
            hasChevron: true
          }
        ]}
      />
    )
  }
}
