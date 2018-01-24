/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import List from 'src/components/List/List'
import sceneLayout from 'src/utils/sceneLayout'
import LoginSceneLayout from '../LoginSceneLayout'
import scenes from 'src/scenes'
import strings from './strings'

@sceneLayout(LoginSceneLayout)
export default class OptionSelector extends React.Component {
  static propTypes = {
    navigator: PropTypes.object,
  }

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
            hasArrow: true,
            onPress: () => this.props.navigator.push({
              screen: scenes.Login.EnterMnemonic,
            }),
          },
          {
            key: strings.walletFile,
            icon: require('src/assets/icons/wallet.png'),
            hasArrow: true
          },
          {
            key: strings.privateKey,
            icon: require('src/assets/icons/key.png'),
            hasArrow: true,
            onPress: () => this.props.navigator.push({
              screen: scenes.Login.EnterPrivate,
            })
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
