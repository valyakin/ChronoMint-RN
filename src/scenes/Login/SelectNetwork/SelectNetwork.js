/* @flow */
import React from 'react'
import { View } from 'react-native'
import List from 'src/components/List'
import sceneLayout from 'src/utils/sceneLayout'
import LoginSettingsLayout from '../LoginSettingsLayout'
import strings from './strings'

@sceneLayout(LoginSettingsLayout)
export default class SelectNetwork extends React.Component {
  static sceneOptions = {
    title: strings.network
  }

  render () {
    return (
      <View>
        <List
          theme='light'
          sections={[
            {
              data: [
                {
                  key: strings.mainnet,
                  isChecked: true
                },
                {
                  key: strings.rinkeby,
                  isChecked: false
                },
                {
                  key: strings.kovan,
                  isChecked: false
                }
              ]
            },
            {
              title: '',
              data: [
                {
                  key: strings.useLocalNode,
                  switchOptions: {}
                }
              ]
            }
          ]}
        />
      </View>
    )
  }
}
