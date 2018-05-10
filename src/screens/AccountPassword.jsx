/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import { type TAccount } from '../containers/AccountPasswordContainer'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import Separator from '../components/Separator'
import TextButton from '../components/TextButton'

export type TAccountPasswordProps = {
  accounts: Array<TAccount>,
  onChangePassword: (password: string) => void,
  onLogin: () => void,
  onSelectLanguage: () => void,
  onSelectNetwork: () => void,
  onUseWallet: () => void,
}

type TAccountItemProps = TAccount

export default class AccountPassword extends PureComponent<TAccountPasswordProps, {}> {
  render () {
    const {
      accounts,
      onChangePassword,
      onLogin,
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
            <Text style={styles.topBarButtonLabel}>Production</Text >
          </TouchableOpacity >
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={onSelectLanguage}
            style={styles.topBarButton}
          >
            <Text style={styles.topBarButtonLabel} >EN-US</Text >
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
        <Separator style={styles.separator} />
        <AccountItem {...accounts[0]} />
        <Separator style={styles.separator} />
        <Input
          autoCorrect={false}
          onChangeText={onChangePassword}
          placeholder={I18n.t('CreateWallet.password')}
          secureTextEntry
          style={styles.input}
        />
        <PrimaryButton
          label={I18n.t('AccountPassword.login').toUpperCase()}
          onPress={onLogin}
        />
        <Text style={styles.or}>
          {I18n.t('or')}
        </Text>
        <TextButton
          label={I18n.t('AccountPassword.recoverUsingMnemonic')}
          onPress={onUseWallet}
        />
        <Text style={styles.copyright}>
          {I18n.t('copyright')}
        </Text>
      </View>
    )
  }
}

class AccountItem extends PureComponent<TAccountItemProps, {}> {
  render () {
    const { accountImage, address } = this.props

    return (
      <View style={styles.item}>
        <Image
          source={accountImage}
          style={styles.itemImage}
        />
        <Text style={styles.address}>
          {address}
        </Text>
        <Image
          source={require('../images/chevron-right.png')}
          style={styles.chevron}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  address: {
    color: '#A3A3CC',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 20,
    tintColor: 'rgba(255, 255, 255, 0.25)',
  },
  copyright: {
    alignSelf: 'center',
    color: '#9997B2',
    fontSize: 12,
    marginVertical: 30,
    textAlign: 'center',
  },
  input: {
    margin: 20,
  },
  item: {
    flexDirection: 'row',
    margin: 20,
  },
  itemImage: {
    borderRadius: 20,
    height: 40,
    marginRight: 20,
    width: 40,
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
  separator: {
    backgroundColor: '#9997B2',
    marginHorizontal: 20,
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

