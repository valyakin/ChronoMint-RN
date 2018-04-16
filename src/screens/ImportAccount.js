/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import TextButton from '../components/TextButton'

export default class ImportAccount extends React.Component {
  handleMnemonic = () => {
    this.props.navigator.push({
      screen: 'EnterMnemonic',
      title: 'Enter mnemonic to reset password',
    })
  }
  
  handlePrivateKey = () => {
    this.props.navigator.push({
      screen: 'EnterPrivateKey',
      title: 'Enter private key',
    })
  }

  handleUseWallet = () => {
    this.props.navigator.push({
      screen: 'CreateWallet',
    })
  }

  render () {
    return (
      <View>
        <View style={styles.buttons}>
          <MethodButton
            label={I18n.t('ImportAccount.mnemonic')}
            image={require('../images/mnemonic.png')}
            onPress={this.handleMnemonic}
          />
          <MethodButton
            label={I18n.t('ImportAccount.privateKey')}
            image={require('../images/private-key.png')}
            onPress={this.handlePrivateKey}
          />
        </View>

        <Text style={styles.or}>
          {I18n.t('or')}
        </Text>
        <TextButton
          label='Create new wallet'
          onPress={this.handleUseWallet}
        />
      </View>
    )
  }
}

class MethodButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={this.props.onPress}
      >
        <Image
          source={this.props.image}
          style={styles.itemImage}
        />
        <Text style={styles.itemLabel}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  item: {
    backgroundColor: '#614DBA',
    width: 105,
    height: 105,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  itemImage: {
    width: 48,
    height: 48,
  },
  itemLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  or: {
    color: '#A3A3CC',
    alignSelf: 'center',
    fontSize: 16,
  },
})
