/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import List from 'src/components/List'
import sceneLayout from 'src/utils/sceneLayout'
import LoginSettingsLayout from '../LoginSettingsLayout'
import scenes from 'src/scenes'

@sceneLayout(LoginSettingsLayout)
export default class LoginSettings extends React.Component {
  static propTypes = {
    navigator: PropTypes.object
  }

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
              icon: require('src/assets/icons/network.png'),
              onPress: () => this.props.navigator.push({
                screen: scenes.Login.SelectNetwork
              })
            },
            {
              key: 'Language',
              hasArrow: true,
              icon: require('src/assets/icons/comment.png'),
              onPress: () => this.props.navigator.push({
                screen: scenes.Login.ChangeLanguage
              })
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
