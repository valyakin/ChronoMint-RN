/* @flow */
import * as React from 'react'
import { View, TouchableOpacity, Image, Alert, TextInput, KeyboardAvoidingView } from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import screenLayout from '../../../utils/screenLayout'
import LoginScreenLayout from '../LoginScreenLayout'
import FetchingIndicator from '../../../components/FetchingIndicator/FetchingIndicator'
import Spacer from '../../../components/Spacer'
import strings from './strings'
import styles from './styles'

const makeArray = (callback) =>
  (times, ...rest) =>
    Array(times).fill('').map((value, index) => callback(index, ...rest))

type PinBulletProps = {
  isActive?: boolean
}

const PinBullet = (props: PinBulletProps) =>
  <View
    style={[
      styles.pinBullet,
      props.isActive && styles.pinBulletActive
    ]}
  />

const FingerprintButton = (props) =>
  <TouchableOpacity
    onPress={props.onPress}
  >
    <Image
      source={require('../../../assets/icons/fingerprint.png')}
    />
  </TouchableOpacity>

type Props = {
  navigator: {
    push: ({ screen: React.Node }) => void
  }
}

class EnterPin extends React.Component<Props, {}> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle,
    hasFetchingStatus: false,
    hasLogo: true
  }

  handleFingerprintPress = () => {
    FingerprintScanner
      .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then(() => {
        Alert.alert('Authenticated successfully')
      })
      .catch((error) => {
        Alert.alert(error.message)
      })
  }

  state = {
    pin: ''
  }

  handleEnterPin = (pin) => {
    if (pin.length >= 4) {
      Alert.alert('Wrong pin')
    }
    this.setState({ pin })
  }

  makeBulletsArray = makeArray((index, activeBullet) =>
    <PinBullet
      key={index}
      isActive={index <= activeBullet}
    />
  )

  render () { 
    return (
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <View style={styles.bulletsContainer}>
          {this.makeBulletsArray(4, this.state.pin.length - 1)}
        </View>
        <TextInput
          autoFocus
          keyboardType='numeric'
          onChangeText={this.handleEnterPin}
          style={{ opacity: 0 }}
        />
        <Spacer />
        <View style={styles.bottomActions}>
          <FetchingIndicator />
          <FingerprintButton
            onPress={this.handleFingerprintPress}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default screenLayout(LoginScreenLayout)(EnterPin)
