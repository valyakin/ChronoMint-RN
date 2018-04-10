/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import Button from '../components/Button'
import LoginSceneLayout from './LoginScreenLayout'
import sceneLayout from '../utils/screenLayout'
import Cautions from '../components/Cautions'

type State = {
  userConfirm: boolean
}

class GenerateWalletFile extends React.Component<{}, State> {
  static screenOptions = {
    title: I18n.t('GenerateWalletFile.title'),
    subtitle: I18n.t('GenerateWalletFile.subtitle'),
  }

  state = {
    userConfirm: false,
  }

  handleUserConfirm = () => {
    const { userConfirm } = this.state

    this.setState({
      userConfirm: !userConfirm,
    })
  } 
  
  render () {
    const { userConfirm } = this.state

    return (
      <View>
        <Input
          isDark
          label={I18n.t('GenerateWalletFile.password')}
          style={styles.input}
        />
        <Cautions />
        <View 
          style={styles.actions}
        >
          <Checkbox
            isDark
            isChecked={userConfirm}
            onPress={this.handleUserConfirm}
            label={I18n.t('GenerateWalletFile.understand')}
          />
          <Button
            isDark
            isDisabled={!userConfirm}
            style={styles.downloadButton}
            label={I18n.t('GenerateWalletFile.downloadWallet')}
          />
        </View>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  actions: {
    margin: 8,
    flexDirection: 'row',
  },
  input: {
    height: 48,
    marginBottom: 16,
  },
  downloadButton: { flex: 1 },
})

export default sceneLayout(LoginSceneLayout)(GenerateWalletFile)
