/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import mnemonicProvider from 'login/network/mnemonicProvider'
import { setUsePinProtection } from 'redux/sensitive/actions'
import PrimaryButton from 'components/PrimaryButton'
import Separator from 'components/Separator'
import TextButton from 'components/TextButton'

class WalletBackup extends React.Component<WalletBackupProps, {}> {

  state = {
    usePinProtection: true,
  }

  handleBackupWallet = () => {
    const mnemonic = mnemonicProvider.generateMnemonic()

    this.props.navigator.push({
      screen: 'GenerateMnemonic',
      title: I18n.t('GenerateMnemonic.title'),
      passProps: {
        mnemonic,
      },
    })
  }

  handlePinProtectionSwitch = (usePinProtection) => {
    this.setState({
      usePinProtection,
    })
  }

  handleBackupLater = this.props.onLogin

  render () {
    return (
      <View>
        <Text style={styles.title}>
          {I18n.t('WalletBackup.title')}
        </Text>
        <Text style={styles.subtitle}>
          {I18n.t('WalletBackup.subtitle')}
        </Text>
        <Separator style={styles.separator} />
        <View style={styles.switchRow}>
          <Text style={styles.switchRowLabel}>
            {I18n.t('WalletBackup.usePinProtection')}
          </Text>
          <Switch
            tintColor='#6EE289'
            thumbTintColor='#6EE289'
            value={this.state.usePinProtection}
            onValueChange={this.handlePinProtectionSwitch}
          />
        </View>
        <Separator style={styles.separator} />
        <PrimaryButton
          label={I18n.t('WalletBackup.backupWallet').toUpperCase()}
          onPress={this.handleBackupWallet}
        />
        <Text style={styles.or}>
          {I18n.t('WalletBackup.or')}
        </Text>
        <TextButton
          label={I18n.t('WalletBackup.later')}
          onPress={this.handleBackupLater}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  usePinProtection: state.get('sensitive').usePinProtection,
})

const mapDispatchToProps = {
  setUsePinProtection,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletBackup)

const styles = StyleSheet.create({
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 25,
    margin: 20,
  },
  subtitle: {
    color: '#A3A3CC',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  }, 
  separator: {
    backgroundColor: '#424066',
  },
  switchRow: {
    flexDirection: 'row',
    margin: 20,
  },
  switchRowLabel: {
    flex: 1,
    color: '#6EE289',
    fontWeight: '900',
    fontSize: 16,
  },
  or: {
    color: '#A3A3CC',
    alignSelf: 'center',
    fontSize: 16,
  },
})

type WalletBackupProps = {
  setUsePinProtection: typeof setUsePinProtection
}
