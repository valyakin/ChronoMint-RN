/* @flow */
import * as React from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import I18n from 'react-native-i18n'
import screenLayout from '../utils/screenLayout'
import LoginScreenLayout from './LoginScreenLayout'
import FetchingIndicator from '../components/FetchingIndicator'
import Spacer from '../components/Spacer'
import colors from '../utils/colors'
import images from '../assets/images'

const makeArray = (callback) =>
  (times, ...rest) =>
    Array(times).fill('').map((value, index) => callback(index, ...rest))

type PinBulletProps = {
  isActive?: boolean
}

const PinBullet = (props: PinBulletProps) =>
  (<View
    style={[
      styles.pinBullet,
      props.isActive && styles.pinBulletActive,
    ]}
  />)

const FingerprintButton = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Image
      source={images.fingerprint}
    />
  </TouchableOpacity>
)

type Props = {
  navigator: {
    push: ({ screen: React.Node }) => void
  }
}

class EnterPinCode extends React.Component<Props, {}> {
  static screenOptions = {
    title: I18n.t('EnterPinCode.title'),
    subtitle: I18n.t('EnterPinCode.subtitle'),
    hasFetchingStatus: false,
    hasLogo: true,
  }

  state = {
    pin: '',
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

  handleEnterPin = (pin) => {
    if (pin.length >= 4) {
      Alert.alert('Wrong pin')
    }
    this.setState({ pin })
  }

  makeBulletsArray = makeArray((index, activeBullet) =>
    (<PinBullet
      key={index}
      isActive={index <= activeBullet}
    />)
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
          style={styles.pinInput}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bulletsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 32,
  },
  pinBullet: {
    marginHorizontal: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.backgroundLight,
    opacity: .4,
  },
  pinBulletActive: {
    opacity: 1,
  },
  pinInput: {
    opacity: 0,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
})

export default screenLayout(LoginScreenLayout)(EnterPinCode)
