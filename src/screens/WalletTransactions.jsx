/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import BalanceModel from 'models/tokens/BalanceModel'
import MainWalletModel from 'models/wallet/MainWalletModel'
import TokensModel from 'models/tokens/TokenModel'
import colors from '../utils/colors'
import DetailsSection from '../components/DetailsSection'
import Separator from '../components/Separator'
import TransactionsList from '../components/TransactionsList'
import WalletAlert from '../components/WalletAlert'

export type TTransaction = {
  address: string,
  confirmations: number,
  id: string,
  symbol: string,
  type: 'sending' | 'receiving',
  value: number,
}

export type WalletTransactionsProps = {
  address: string,
  balance: typeof BalanceModel,
  tokens: typeof TokensModel,
  wallet: typeof MainWalletModel,
  transactions?: Array<TTransaction>, 
}

export default class WalletTransactions extends PureComponent<WalletTransactionsProps> {
  render () {
    const {
      address,
      wallet,
      balance,
      tokens,
      transactions,
    } = this.props

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
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  transactionsListContainer: {
    backgroundColor: colors.background,
    borderRadius: 3,
    marginBottom: 32,
    marginTop: 8,
    paddingVertical: 8,
  },
  transactionsListTitle: {
    paddingBottom: 8,
    paddingHorizontal: 24,
    paddingTop: 4,
  },
  walletAlert: {
    marginTop: 8,
  },
  walletAlertContent: {
    flexDirection: 'row',
  },
  walletAlertImage: {
    height: 32,
    marginRight: 8,
    marginTop: 4,
    width: 32,
  },
  walletAlertText: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '200',
    lineHeight: 18,
  },
})
