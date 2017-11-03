/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { ImageBackground } from 'react-native'
import { Logo, Text, FetchingIndicator } from '@components'
import styles from './styles'

type Props = {
  children?: React.ReactNode,
  title?: string,
  subtitle?: string
}

export default class LoginScreenLayout extends React.Component<Props> {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    navBarButtonColor: 'white',
    statusBarTextColorScheme: 'light'
  }

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('@icons/tune.png')
      }
    ]
  }

  static propTypes = {
    children: PropTypes.object,
    screenOptions: PropTypes.object
  }
  
  render () {
    const { title, subtitle } = this.props.screenOptions

    return (
      <ImageBackground source={require('@images/gradient.png')} style={styles.container}>
        <Logo style={styles.logo} />
        { title && <Text style={styles.title}>{title}</Text> }
        { subtitle && <Text style={styles.subtitle}>{subtitle}</Text> }
        <View style={styles.contentArea} >
          { this.props.children }
        </View>
        <FetchingIndicator style={styles.fetchingIndicator} />
      </ImageBackground>
    )
  }
}
