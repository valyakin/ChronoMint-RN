/* @flow */
import React from 'react'
import { View } from 'react-native'
import List from '../../../components/List'
import screenLayout from '../../../utils/screenLayout'
import LoginSettingsLayout from '../LoginSettingsLayout'
import strings from './strings'

class SelectNetwork extends React.Component<{}, {}> {
  static screenOptions = {
    title: strings.network,
  }

  render () {
    return (
      <View>
        <List
          sections={[
            {
              data: [
                {
                  key: strings.mainnet,
                  isChecked: true,
                },
                {
                  key: strings.rinkeby,
                  isChecked: false,
                },
                {
                  key: strings.kovan,
                  isChecked: false,
                },
              ],
            },
            {
              title: '',
              data: [
                {
                  key: strings.useLocalNode,
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
