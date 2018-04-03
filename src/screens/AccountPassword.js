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
import isValid from '../utils/validators'
import PrimaryButton from '../components/PrimaryButton'
import TextButton from '../components/TextButton'
import Separator from '../components/Separator'

export default class AccountPassword extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  state = {
    password: '',
  }

  handleSelectNetwork = () => {
    this.props.navigator.push({
      screen: 'SelectNetwork',
    })
  }

  handleSelectLanguage = () => {
    this.props.navigator.push({
      screen: 'SelectLanguage',
    })
  }

  handleEnterPassword = (password) => {
    this.setState({ password })
  }

  handleLogin = () => {
    const { password } = this.state
    if (!isValid.password(password)) {
      this.addError(I18n.t('AccountPassword.invalidPasswordError'))
    }

    this.props.navigator.push({
      screen: 'WalletsList',
      title: I18n.t('WalletsList.title'),
    })
  }

  handleUseWallet = () => {
    this.props.navigator.push({ screen: 'SelectAccount' })
  }

  addError = (error) => {
    alert(error)
  }

  render () {
    return (
      <View>
        <View style={styles.topBarActions}>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={this.handleSelectNetwork}
          >
            <Image
              style={styles.topBarButtonImage}
              source={require('../images/ios-gear-outline.png')}
            />
            <Text style={styles.topBarButtonLabel} >Production</Text >
          </TouchableOpacity >
          <View style={styles.spacer} />
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={this.handleSelectLanguage}
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
        <Item {...account} />
        <Separator style={styles.separator} />
        <Input
          placeholder={I18n.t('CreateWallet.password')}
          style={styles.input}
          secureTextEntry
          onChangeText={this.handleChangePassword}
          autoCorrect={false}
        />
        <PrimaryButton
          label={I18n.t('AccountPassword.login').toUpperCase()}
          onPress={this.handleCreateWallet}
        />
        <Text style={styles.or}>
          {I18n.t('or')}
        </Text>
        <TextButton
          label={I18n.t('AccountPassword.recoverUsingMnemonic')}
          onPress={this.handleUseWallet}
        />
        <Text style={styles.copyright}>
          {I18n.t('copyright')}
        </Text>
      </View>
    )
  }
}

class Item extends React.Component {
  render () {
    return (
      <View style={styles.item}>
        <Image
          source={this.props.accountImage}
          style={styles.itemImage}
        />
        <Text style={styles.address}>
          {this.props.address}
        </Text>
        <Image
          source={require('../images/chevron-right.png')}
          style={styles.chevron}
        />
      </View>
    )
  }
}

const account = {
  id: '1',
  address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
  accountImage: require('../images/profile-photo-1.jpg'),
}

const styles = StyleSheet.create({
  topBarButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarActions: {
    flexDirection: 'row',
    margin: 20,
    top: -44,
  },
  spacer: {
    flex: 1,
  },
  topBarButtonImage: {
    tintColor: '#ffffff',
    marginRight: 10,
  },
  separator: {
    backgroundColor: '#9997B2',
    marginHorizontal: 20,
  },
  topBarButtonLabel: {
    color: '#FFFFFF',
  },
  logo: {
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
  logoText: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    margin: 20,
  },
  or: {
    color: '#A3A3CC',
    alignSelf: 'center',
    fontSize: 16,
  },
  copyright: {
    color: '#9997B2',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    marginVertical: 30,
  },
  item: {
    flexDirection: 'row',
    margin: 20,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  address: {
    flex: 1,
    color: '#A3A3CC',
    fontSize: 16,
    fontWeight: '700',
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 20,
    tintColor: 'rgba(255, 255, 255, 0.25)',
  },
})

