/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import I18n from 'react-native-i18n'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import TextButton from '../components/TextButton'

export type TCreateWalletProps = {
  onChangePassword: (password: string) => void,
  onChangePasswordConfirmation: (passwordConfirmation: string) => void,
  onCreateWallet: () => void,
  onSelectLanguage: () => void,
  onSelectNetwork: () => void,
  onUseWallet: () => void,
}

export default class CreateWallet extends React.Component<TCreateWalletProps, {}> {
  render () {
    const {
      onChangePassword,
      onChangePasswordConfirmation,
      onCreateWallet,
      onSelectLanguage,
      onSelectNetwork,
      onUseWallet,
    } = this.props

    return (
      <View>
        <View style={styles.topBarActions}>
          <TouchableOpacity
            onPress={onSelectNetwork}
            style={styles.topBarButton}
          >
            <Image
              source={require('../images/ios-gear-outline.png')}
              style={styles.topBarButtonImage}
            />
            <Text style={styles.topBarButtonLabel}>
              Production
            </Text >
          </TouchableOpacity >
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={onSelectLanguage}
            style={styles.topBarButton}
          >
            <Text style={styles.topBarButtonLabel}>
              EN-US
            </Text >
          </TouchableOpacity >
        </View>
        <Image
          source={require('../images/ChronoWalletIcon.png')}
          style={styles.logo}
        />
        <Image
          source={require('../images/ChronoWalletText.png')}
          style={styles.logoText}
        />
        <Input
          autoCorrect={false}
          onChangeText={onChangePassword}
          placeholder={I18n.t('CreateWallet.password')}
          secureTextEntry
          style={styles.input}
        />
        <Input
          autoCorrect={false}
          onChangeText={onChangePasswordConfirmation}
          placeholder={I18n.t('CreateWallet.confirmPassword')}
          secureTextEntry
          style={styles.input}
        />
        <PrimaryButton
          label={I18n.t('CreateWallet.createWallet').toUpperCase()}
          onPress={onCreateWallet}
        />
        <Text style={styles.or}>
          {I18n.t('CreateWallet.or')}
        </Text>
        <TextButton
          label={I18n.t('CreateWallet.useExistingWallet')}
          onPress={onUseWallet}
        />
        <Text style={styles.copyright}>
          {I18n.t('CreateWallet.copyright')}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  copyright: {
    alignSelf: 'center',
    color: '#9997B2',
    fontSize: 12,
    marginVertical: 30,
    textAlign: 'center',
  },
  input: {
    margin: 20,
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: -20,
  },
  logoText: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16,
  },
  spacer: {
    flex: 1,
  },
  topBarActions: {
    flexDirection: 'row',
    margin: 20,
    top: -44,
  },
  topBarButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  topBarButtonImage: {
    marginRight: 10,
    tintColor: '#ffffff',
  },
  topBarButtonLabel: {
    color: '#FFFFFF',
  },
})
