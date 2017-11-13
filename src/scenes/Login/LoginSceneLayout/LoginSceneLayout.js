/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View, ImageBackground } from 'react-native'
import Logo from 'src/components/Logo'
import Text from 'src/components/Text'
import FetchingIndicator from 'src/components/FetchingIndicator'
import scenes from 'src/scenes'
import styles from './styles'

type Props = {
  children?: React.ReactNode,
  navigator?: Object,
  title?: string,
  subtitle?: string
}

export default class LoginSceneLayout extends React.Component<Props> {
  static propTypes = {
    children: PropTypes.object,
    navigator: PropTypes.object,
    sceneOptions: PropTypes.object
  }

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
        icon: require('src/assets/icons/tune.png'),
        id: 'loginSettings'
      }
    ]
  }

  componentDidMount () {
    const { navigator } = this.props

    navigator.setOnNavigatorEvent(({type, id}) => {
      if (type === 'NavBarButtonPress' && id === 'loginSettings') {
        navigator.push({
          screen: scenes.Login.LoginSettings
        })
      }
    })
  }
  
  render () {
    const { title, subtitle } = this.props.sceneOptions

    return (
      <ImageBackground
        source={require('src/assets/images/gradient.png')}
        style={styles.container}
      >
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
