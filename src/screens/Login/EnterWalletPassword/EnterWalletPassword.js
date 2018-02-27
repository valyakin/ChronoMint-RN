/* @flow */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Checkbox from '../../../components/Checkbox'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import LoginScreenLayout from '../LoginScreenLayout'
import screenLayout from '../../../utils/screenLayout'
import strings from './strings'
import styles from './styles'

type Props = {
  wallet: {},
  onLogin: (wallet: {}, password: string) => void
}

type State = {
  password: string,
  isPending: boolean
}

class EnterWalletPassword extends React.Component<Props, State> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle,
  }

  state = {
    password: '',
    isPending: false,
  }
  
  handlePress = () => {
    this.setState({ isPending: true })
    this.props.onLogin(this.props.wallet, this.state.password)
  }

  handleInput = (password) => {
    this.setState({ password })
  }

  render () {
    return (
      <View>
        <Input
          label={strings.private}
          style={styles.input}
          multiline
          isDark
          onChangeText={this.handleInput}
        />
        <Checkbox
          label={strings.saveOnDevice}
          isDark
        />
        <View 
          style={styles.actions}
        >
          { this.state.isPending ? 
            <ActivityIndicator /> :
            <Button
              label={strings.login}
              isDark
              onPress={this.handlePress}
            />
          }
        </View>
      </View>
    )
  }
}

export default screenLayout(LoginScreenLayout)(EnterWalletPassword)
