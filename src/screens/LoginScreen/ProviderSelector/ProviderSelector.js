/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import Text from '../../../components/common/Text'
import LoginScreenLayout from '../LoginScreenLayout'
import strings from './strings'

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
    const { navigator } = this.props
    return (
      <LoginScreenLayout>
        <Text
          onPress={() => navigator.push({
            screen: 'LoginScreen.OptionSelector'
          })}
        >{strings.selectProvider}</Text>
      </LoginScreenLayout>
    )
  }
}
