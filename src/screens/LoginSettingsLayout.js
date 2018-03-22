/* @flex */
import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../utils/colors'

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
    topBarElevationShadowEnabled: false,
    statusBarTextColorScheme: 'dark',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 34,
    lineHeight: 48,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    color: colors.foreground,
    alignSelf: 'flex-start',
  },
  subtitle: {
    color: colors.foreground,
    margin: 16,
    lineHeight: 30,
    alignSelf: 'flex-start',
    opacity: .6,
    fontSize: 20,
  },
})
