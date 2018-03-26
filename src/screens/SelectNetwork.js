/* @flow */
import React from 'react'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import List from '../components/List'
import screenLayout from '../utils/screenLayout'
import LoginSettingsLayout from './LoginSettingsLayout'

class SelectNetwork extends React.Component<{}, {}> {
  static screenOptions = {
    title: I18n.t('SelectNetwork.title'),
  }

  render () {
    return (
      <View>
        <List
          sections={[
            {
              data: [
                {
                  key: I18n.t('SelectNetwork.mainnet'),
                  isChecked: true,
                },
                {
                  key: I18n.t('SelectNetwork.rinkeby'),
                  isChecked: false,
                },
                {
                  key: I18n.t('SelectNetwork.kovan'),
                  isChecked: false,
                },
              ],
            },
            {
              title: '',
              data: [
                {
                  key: I18n.t('SelectNetwork.useLocalNode'),
                  switchOptions: {},
                },
              ],
            },
          ]}
        />
      </View>
    )
  }
}

export default screenLayout(LoginSettingsLayout)(SelectNetwork)
