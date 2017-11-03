/* @flex */
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text } from '@components'
import styles from './styles'

export default class LoginSettingsLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    screenOptions: PropTypes.object
  }

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    navBarButtonColor: '#00005F',
    statusBarTextColorScheme: 'dark'
  }

  render () {
    const { title, subtitle } = this.props.screenOptions

    return (
      <View style={styles.container}>
        { title && <Text style={styles.title}>{title}</Text> }
        { subtitle && <Text style={styles.subtitle}>{subtitle}</Text> }
        {this.props.children}
      </View>
    )
  }
}
