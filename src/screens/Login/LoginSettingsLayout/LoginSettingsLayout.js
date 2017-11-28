/* @flex */
import * as React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Text from '../../../components/Text'
import styles from './styles'

type LoginSettingsLayoutProps = {
  children?: React.Node,
  screenOptions?: {
    title?: string,
    subtitle?: string,
    hasLogo?: boolean
  }
}

export default class LoginSettingsLayout extends React.Component<LoginSettingsLayoutProps, {}> {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    navBarButtonColor: '#00005F',
    statusBarTextColorScheme: 'dark'
  }

  static childContextTypes = {
    theme: PropTypes.string
  }

  getChildContext () {
    return { theme: 'dark' }
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
