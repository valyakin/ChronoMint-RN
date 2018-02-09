/* @flow */
import React from 'react'
import { View } from 'react-native'
import List from '../../../components/List'
import screenLayout from '../../../utils/screenLayout'
import LoginSettingsLayout from '../LoginSettingsLayout'
import strings from './strings'

class ChangeLanguage extends React.Component<{}, {}> {
  static screenOptions = {
    title: strings.language,
  }

  render () {
    return (
      <View>
        <List
          data={[
            {
              key: 'English',
              isChecked: true,
            },
            {
              key: 'Русский',
              isChecked: false,
            },
          ]}
        />
      </View>
    )
  }
}

export default screenLayout(LoginSettingsLayout)(ChangeLanguage)
