/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import colors from 'utils/colors'
import DetailsSection from 'components/DetailsSection'
import Separator from 'components/Separator'
import TransactionsList from 'components/TransactionsList'
import WalletAlert from 'components/WalletAlert'

export default class WalletTransactions extends React.Component {

  render () {
    const {
      address,
      wallet,
      balance,
      tokens,
    } = this.props

    console.log('WalletTransactions this.props', this.props)
    /**
     * [Alexey Ozerov] Need to clarify: does 'mode' used only for multisig?
     * Also need a better place for the mode "calculations"
     */
    let mode = '2fa'
    if (wallet.isMultisig()) {
      if (wallet.isTimeLocked()) {
        mode = 'timeLocked'
      } else {
        mode = 'shared'
      }
    }

    return (
      <ScrollView style={styles.mainSection}>
        <DetailsSection
          mode={mode}
          balance={balance}
          address={address}
          tokensLength={tokens && Object.keys(tokens).length || 0}
        />
        <WalletAlert
          title='23 February 2018'
          style={styles.walletAlert}
          actions={[
            {
              id: 'revoke',
              title: I18n.t('Wallet.revoke'),
            }, {
              id: 'sign',
              title: I18n.t('Wallet.sign'),
              isMain: true,
            },
          ]}
          contentContainerStyle={styles.walletAlertContent}
        >
          <Image
            source={require('../images/profile-circle-small.png')}
            style={styles.walletAlertImage}
          />
          <Text style={styles.walletAlertText}>
            {I18n.t('Wallet.signNewWalletOwner', { address })}
          </Text>
        </WalletAlert>
        <View style={styles.transactionsListContainer}>
          <Text style={styles.transactionsListTitle}>
            23 February 2018
          </Text>
          <Separator />
          <TransactionsList
            transactions={transactions}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainSection: {
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  walletAlert: {
    marginTop: 8,
  },
  walletAlertContent: {
    flexDirection: 'row',
  },
  walletAlertImage: {
    width: 32,
    height: 32,
    marginRight: 8,
    marginTop: 4,
  },
  walletAlertText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '200',
    flexShrink: 1,
  },
  transactionsListContainer: {
    backgroundColor: colors.background,
    marginTop: 8,
    marginBottom: 32,
    paddingVertical: 8,
    borderRadius: 3,
  },
  transactionsListTitle: {
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
})

const transactions = [
  {
    id: '0',
    type: 'sending',
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
    confirmations: 1,
    symbol: 'ETH',
    value: -.5,
  },
  {
    id: '1',
    type: 'receiving',
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
    confirmations: 1,
    symbol: 'TIME',
    value: 1,
  },
]
