/* @flow */
import React from 'react'
import { View } from 'react-native'
import Checkbox from 'src/components/Checkbox'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import LoginSceneLayout from '../LoginSceneLayout'
import sceneLayout from 'src/utils/sceneLayout'
import strings from './strings'
import styles from './styles'

@sceneLayout(LoginSceneLayout)
export default class EnterPrivate extends React.Component {
  static sceneOptions = {
    title: strings.title,
    subtitle: strings.subtitle
  }
  
  render () {
    const theme = styles('dark')

    return (
      <View>
        <Input
          label={strings.private}
          theme='dark'
          style={{
            height: 80
          }}
          multiline
        />
        <Checkbox
          theme='dark'
          label={strings.saveOnDevice}
        />
        <View 
          style={theme.actions}
        >
          <Button
            theme='dark'
            label={strings.login}
          />
        </View>
      </View>
    )
  }
}
