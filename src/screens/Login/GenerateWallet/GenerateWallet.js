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
import Cautions from '../../../components/Cautions/Cautions'

type State = {
  userConfirm: boolean
}

class GenerateWallet extends React.Component<{}, State> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle,
  }

  state = {
    userConfirm: false,
  }

  toggleUserConfirm = () => {
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
          label={strings.password}
          style={styles.input}
        />
        <Cautions />
        <View 
          style={styles.actions}
        >
          <Checkbox
            isDark
            isChecked={userConfirm}
            onPress={this.toggleUserConfirm}
            label={strings.understand}
          />
          <Button
            isDark
            isDisabled={!userConfirm}
            style={styles.downloadButton}
            label={strings.downloadWallet}
          />
        </View>
      </View>
    )
  }
}

export default sceneLayout(LoginSceneLayout)(GenerateWallet)
