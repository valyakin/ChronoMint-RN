/* @flow */
import * as React from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  Image,
} from 'react-native'
import FetchingIndicator from '../components/FetchingIndicator'
import images from '../assets/images'
import colors from '../utils/colors'

type ScreenOptions = {
  title?: string | React.Node,
  subtitle?: string | React.Node,
  hasFetchingStatus?: boolean,
  hasLogo?: boolean
}

type Props = {
  screenOptions?: ScreenOptions,
  children?: React.Node,
  navigator?: Object,
  title?: string,
  subtitle?: string
}

export default class LoginSceneLayout extends React.Component<Props> {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    navBarButtonColor: 'white',
    topBarElevationShadowEnabled: false,
    statusBarTextColorScheme: 'light',
  }

  static navigatorButtons = {
    rightButtons: [
      {
        icon: images.tune,
        id: 'loginSettings',
      },
    ],
  }

  componentDidMount () {
    const { navigator } = this.props

    navigator.setOnNavigatorEvent(({ type, id }) => {
      if (type === 'NavBarButtonPress' && id === 'loginSettings') {
        navigator.push({
          screen: 'LoginSettings',
          backButtonTitle: 'Login',
        })
      }
    })
  }
  
  render () {
    const {
      title,
      subtitle,
      hasLogo,
      hasFetchingStatus,
    } = this.props.screenOptions || {}

    return (
      <ImageBackground
        source={images.gradient}
        style={styles.container}
      >
        { hasLogo && <Logo style={styles.logo} /> }
        { title && <Text style={styles.title}>{title}</Text> }
        { subtitle && <Text style={styles.subtitle}>{subtitle}</Text> }
        <View style={styles.contentArea} >
          { this.props.children }
        </View>
        { hasFetchingStatus && <FetchingIndicator style={styles.fetchingIndicator} /> }
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: (Platform.OS !== 'ios' ? 54 : 64),
  },
  logo: {
    marginTop: 40,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    lineHeight: 48,
    marginHorizontal: 16,
    marginTop: 16,
    color: colors.background,
    alignSelf: 'flex-start',
  },
  subtitle: {
    color: colors.background,
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 24,
    height: 48,
    alignSelf: 'flex-start',
    opacity: .8,
    fontSize: 20,
  },
  fetchingIndicator: {
    alignSelf: 'flex-start',
  },
  contentArea: { flex: 1 },
})
