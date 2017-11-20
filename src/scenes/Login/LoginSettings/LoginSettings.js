/* @flow */
import React from 'react'
import { View } from 'react-native'
import List from 'src/components/List'
import sceneLayout from 'src/utils/sceneLayout'
import LoginSettingsLayout from '../LoginSettingsLayout'

@sceneLayout(LoginSettingsLayout)
export default class LoginSettings extends React.Component {
  static sceneOptions = {
    title: 'Settings'
  }
  render () {
    return (
      <View>
        <List
          theme='light'
          data={[
            {
              key: 'Network',
              hasArrow: true,
              icon: require('src/assets/icons/network.png')
            },
            {
              key: 'Language',
              hasArrow: true,
              icon: require('src/assets/icons/comment.png')
            },
            {
              key: 'FAQ',
              hasArrow: true,
              icon: require('src/assets/icons/help-circle.png')
            }
          ]}
        />
      </View>
    )
  }
}
