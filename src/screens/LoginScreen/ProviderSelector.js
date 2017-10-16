/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import Text from '../../components/common/Text'
import LoginScreenLayout from './LoginScreenLayout'

export default class ProviderSelector extends React.Component {
  static propTypes = {
    navigator: PropTypes.object
  }

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    statusBarTextColorScheme: 'dark',
    animated: false
  }

  render () {
    return (
      <LoginScreenLayout>
        <Text
          onPress={() => navigator.push({
            screen: 'LoginScreen.OptionSelector'
          })}
        >Select provider</Text>
      </LoginScreenLayout>
    )
  }
}
