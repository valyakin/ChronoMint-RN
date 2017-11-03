/* @flow */
import React from 'react'
import { View, FlatList } from 'react-native'
import { Text } from '@components'
import screenLayout from '../../screenLayout'
import LoginSettingsLayout from '../LoginSettingsLayout'

@screenLayout(LoginSettingsLayout)
export default class LoginSettings extends React.Component {
  static screenOptions = {
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
