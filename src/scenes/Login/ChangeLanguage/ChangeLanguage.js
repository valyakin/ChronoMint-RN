/* @flow */
import React from 'react'
import { View } from 'react-native'
import List from 'src/components/List'
import sceneLayout from 'src/utils/sceneLayout'
import LoginSettingsLayout from '../LoginSettingsLayout'
import strings from './strings'

@sceneLayout(LoginSettingsLayout)
export default class ChangeLanguage extends React.Component {
  static sceneOptions = {
    title: strings.language
  }

  render () {
    return (
      <View>
        <List
          theme='light'
          data={[
            {
              key: 'English',
              isChecked: true
            },
            {
              key: 'Русский',
              isChecked: false
            }
          ]}
        />
      </View>
    )
  }
}
