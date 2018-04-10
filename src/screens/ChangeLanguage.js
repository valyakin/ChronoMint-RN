/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import List from '../components/List'
import screenLayout from '../utils/screenLayout'
import LoginSettingsLayout from './LoginSettingsLayout'

class ChangeLanguage extends React.Component<{}, {}> {
  static screenOptions = {
    title: I18n.t('ChangeLanguage.title'),
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
