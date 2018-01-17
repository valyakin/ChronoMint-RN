/* @flow */
import React from 'react'
import { View } from 'react-native'
import Checkbox from '../../../components/Checkbox'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import LoginScreenLayout from '../LoginScreenLayout'
import screenLayout from '../../../utils/screenLayout'
import strings from './strings'
import styles from './styles'

class EnterPrivate extends React.Component<{}, {}> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle
  }
  
  render () {
    return (
      <View>
        <Input
          label={strings.private}
          style={styles.input}
          multiline
          isDark
        />
        <Checkbox
          label={strings.saveOnDevice}
          isDark
        />
        <View 
          style={styles.actions}
        >
          <Button
            label={strings.login}
            isDark
          />
        </View>
      </View>
    )
  }
}

export default screenLayout(LoginScreenLayout)(EnterPrivate)
