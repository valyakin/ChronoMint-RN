/* @flow */
import React from 'react'
import { View, FlatList } from 'react-native'
import Text from 'src/components/Text'
import sceneLayout from 'src/utils/sceneLayout'
import LoginSettingsLayout from './LoginSettingsLayout'

@sceneLayout(LoginSettingsLayout)
export default class LoginSettings extends React.Component {
  static sceneOptions = {
    title: 'Settings'
  }
  render () {
    return (
      <View>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
      </View>
    )
  }
}
