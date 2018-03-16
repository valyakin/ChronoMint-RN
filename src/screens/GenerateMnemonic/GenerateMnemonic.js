/* @flow */
import React from 'react'
import { View } from 'react-native'
import Checkbox from '../../../components/Checkbox'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import LoginSceneLayout from '../LoginScreenLayout'
import sceneLayout from '../../../utils/screenLayout'
import strings from './strings'
import styles from './styles'
import Text from '../../../components/Text'
import Cautions from '../../../components/Cautions/Cautions'

type State = {
  userConfirm: boolean
}

class GenerateMnemonic extends React.Component<{}, State> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle,
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
          label={strings.mnemonic}
          style={styles.input}
          editable={false}
          defaultValue='session double sketch deposit balcony supply alpha fossil daring aunt pen hour'
          multiline
        />
        <Text style={styles.attentionText}>{strings.copyMnemonic}</Text>
        <Cautions />
        <View 
          style={styles.actions}
        >
          <Checkbox
            isDark
            isChecked={this.state.userConfirm}
            onPress={this.handleUserConfirm}
            label={strings.understand}
          />
          <Button
            isDark
            isDisabled={!this.state.userConfirm}
            style={styles.continueButton}
            label={strings.continue}
          />
        </View>
      </View>
    )
  }
}

export default sceneLayout(LoginSceneLayout)(GenerateMnemonic)
