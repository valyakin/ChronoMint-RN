/* @flow */
import * as React from 'react'
import { View, ImageBackground } from 'react-native'
import Logo from '../../../components/Logo'
import Text from '../../../components/Text'
import FetchingIndicator from '../../../components/FetchingIndicator'
import screens from '../../'
import styles from './styles'

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
    statusBarTextColorScheme: 'light'
  }

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../../assets/icons/tune.png'),
        id: 'loginSettings'
      }
    ]
  }

  componentDidMount () {
    const { navigator } = this.props

    navigator.setOnNavigatorEvent(({type, id}) => {
      if (type === 'NavBarButtonPress' && id === 'loginSettings') {
        navigator.push({
          screen: screens.Login.LoginSettings,
          backButtonTitle: 'Login'
        })
      }
    })
  }
  
  render () {
    const {
      title,
      subtitle,
      hasLogo,
      hasFetchingStatus
    } = this.props.screenOptions || {}


    return (
      <ImageBackground
        source={require('../../../assets/images/gradient.png')}
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
