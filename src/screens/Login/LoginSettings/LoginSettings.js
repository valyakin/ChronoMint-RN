/* @flow */
import * as React from 'react'
import { View } from 'react-native'
import List from '../../../components/List'
import screenLayout from '../../../utils/screenLayout'
import LoginSettingsLayout from '../LoginSettingsLayout'
import screens from '../../'

type LoginSettingsProps = {
  navigator: {
    push: (Object) => void
  }
}

class LoginSettings extends React.Component<LoginSettingsProps, {}> {
  static screenOptions = {
    title: 'Settings'
  }

  handleSelectNetwork = () => this.props.navigator.push({
    screen: screens.Login.SelectNetwork,
    backButtonTitle: 'Settings'
  })

  handleChangeLanguage = () => this.props.navigator.push({
    screen: screens.Login.ChangeLanguage,
    backButtonTitle: 'Settings'
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
              key: 'Network',
              hasArrow: true,
              icon: require('../../../assets/icons/network.png'),
              onPress: this.handleSelectNetwork
            },
            {
              key: 'Language',
              hasArrow: true,
              icon: require('../../../assets/icons/comment.png'),
              value: 'English',
              onPress: this.handleChangeLanguage
            },
            {
              key: 'FAQ',
              hasArrow: true,
              icon: require('../../../assets/icons/help-circle.png'),
              onPress: this.handleFaq
            }
          ]}
        />
      </View>
    )
  }
}

export default screenLayout(LoginSettingsLayout)(LoginSettings)
