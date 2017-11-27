/* @flow */
import React from 'react'
import List from 'src/components/List/List'
import sceneLayout from 'src/utils/sceneLayout'
import LoginSceneLayout from '../LoginSceneLayout'
import strings from './strings'

@sceneLayout(LoginSceneLayout)
export default class OptionSelector extends React.Component {
  static sceneOptions = {
    title: strings.login,
    subtitle: strings.selectOptions,
    hasLogo: true
  }

  render () {
    return (
      <List
        theme='dark'
        data={[
          {
            key: strings.mnemonicKey,
            icon: require('src/assets/icons/mnemonic.png'),
            hasArrow: true
          },
          {
            key: strings.walletFile,
            icon: require('src/assets/icons/wallet.png'),
            hasArrow: true
          },
          {
            key: strings.privateKey,
            icon: require('src/assets/icons/key.png'),
            hasArrow: true
          },
          {
            key: strings.uPort,
            icon: require('src/assets/icons/uport.png'),
            hasArrow: true
          }
        ]}
      />
    )
  }
}
