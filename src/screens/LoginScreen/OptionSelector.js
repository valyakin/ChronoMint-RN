/* @flow */
import React from 'react'
import LoginScreenLayout from './LoginScreenLayout'
import Text from '../../components/common/Text'

export default class OptionSelector extends React.Component {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    statusBarTextColorScheme: 'light',
    animated: false,
    animationType: 'fade'
  }

  render () {
    return (
      <LoginScreenLayout>
        <Text>Select option</Text>
      </LoginScreenLayout>
    )
  }
}
