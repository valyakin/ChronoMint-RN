/* @flow */
import * as React from 'react'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import List from '../components/List'
import screenLayout from '../utils/screenLayout'
import LoginSettingsLayout from './LoginSettingsLayout'

type LoginSettingsProps = {
  navigator: {
    push: (Object) => void
  }
}

class LoginSettings extends React.Component<LoginSettingsProps, {}> {
  static screenOptions = {
    title: 'Settings',
  }

  handleSelectNetwork = () => this.props.navigator.push({
    screen: 'SelectNetwork',
    backButtonTitle: 'Settings',
  })

  handleChangeLanguage = () => this.props.navigator.push({
    screen: 'ChangeLanguage',
    backButtonTitle: 'Settings',
  })

  handleFaq = () => {

  }
  
  render () {
    return (
      <View>
        <List
          theme='light'
          data={[
            {
              key: I18n.t('LoginSettings.network'),
              hasArrow: true,
              icon: require('../images/network.png'),
              onPress: this.handleSelectNetwork,
            },
            {
              key: I18n.t('LoginSettings.language'),
              hasArrow: true,
              icon: require('../images/comment.png'),
              value: 'English',
              onPress: this.handleChangeLanguage,
            },
            {
              key: I18n.t('LoginSettings.faq'),
              hasArrow: true,
              icon: require('../images/help-circle.png'),
              onPress: this.handleFaq,
            },
          ]}
        />
      </View>
    )
  }
}

export default screenLayout(LoginSettingsLayout)(LoginSettings)
