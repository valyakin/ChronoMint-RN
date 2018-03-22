/* @flow */
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import I18n from 'react-native-i18n'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import Button from '../components/Button'
import LoginSceneLayout from './LoginScreenLayout'
import sceneLayout from '../utils/screenLayout'
import Cautions from '../components/Cautions'
import colors from '../utils/colors'

type State = {
  userConfirm: boolean
}

class GenerateMnemonic extends React.Component<{}, State> {
  static screenOptions = {
    title: I18n.t('GenerateMnemonic.title'),
    subtitle: I18n.t('GenerateMnemonic.subtitle'),
  }

  state = {
    userConfirm: false,
  }

  handleUserConfirm = () => {
    this.setState({
      userConfirm: !this.state.userConfirm,
    })
  }
  
  render () {
    return (
      <View>
        <Input
          isDark
          label={I18n.t('GenerateMnemonic.mnemonic')}
          style={styles.input}
          editable={false}
          defaultValue='session double sketch deposit balcony supply alpha fossil daring aunt pen hour'
          multiline
        />
        <Text style={styles.attentionText}>{I18n.t('GenerateMnemonic.copyMnemonic')}</Text>
        <Cautions />
        <View 
          style={styles.actions}
        >
          <Checkbox
            isDark
            isChecked={this.state.userConfirm}
            onPress={this.handleUserConfirm}
            label={I18n.t('GenerateMnemonic.understand')}
          />
          <Button
            isDark
            isDisabled={!this.state.userConfirm}
            style={styles.continueButton}
            label={I18n.t('GenerateMnemonic.continue')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actions: {
    margin: 8,
    flexDirection: 'row',
  },
  input: {
    height: 80,
  },
  attentionText: {
    color: colors.backgroundLight,
    margin: 16,
    fontSize: 16,
    fontWeight: '700',
  },
  continueButton: { flex: 1 },
})

export default sceneLayout(LoginSceneLayout)(GenerateMnemonic)
