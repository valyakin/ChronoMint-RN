/* @flow */
import React from 'react'
import { View } from 'react-native'
import Checkbox from '../../../components/Checkbox'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import LoginScreenLayout from '../LoginScreenLayout'
import screenLayout from '../../../utils/screenLayout'
import screens from '../../'
import strings from './strings'
import styles from './styles'

type Props = {
  navigator: {
    push: (Object) => void
  }
}

type State = {
  mnemonic: string
}

class EnterMnemonic extends React.Component<Props, State> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle,
  }

  state = {
    mnemonic: '',
  }

  handleLogin = () => {
    console.log('===LOGIN===')
    this.props.onLogin(this.state.mnemonic)
  }

  handleMnemonicChange = (mnemonic) => {
    console.log({mnemonic})
    this.setState({ mnemonic })
  }

  handleGenerateMnemonic = () => {
    this.props.navigator.push({
      screen: screens.Login.GenerateMnemonic,
      backButtonTitle: 'Mnemonic',
    })
  }
  
  render () {
    return (
      <View>
        <Input
          isDark
          label={strings.mnemonic}
          style={styles.input}
          multiline
          onChangeText={this.handleMnemonicChange}
        />
        <Checkbox
          isDark
          label={strings.saveOnDevice}
        />
        <View 
          style={styles.actions}
        >
          <Button
            isDark
            label={strings.login}
            onPress={this.handleLogin}
          />
          <Button
            isDark
            icon={require('../../../assets/icons/mnemonic.png')}
            style={styles.generateButton}
            label={strings.generateMnemonic}
            onPress={this.handleGenerateMnemonic}
          />
        </View>
      </View>
    )
  }
}

export default screenLayout(LoginScreenLayout)(EnterMnemonic)
