/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import DetailsSection, { type TDetailSection } from 'components/DetailsSection'
import Separator from 'components/Separator'
import TransactionsList from 'components/TransactionsList'
import WalletAlert from 'components/WalletAlert'
import { type MainWalletModel as TMainWalletModel } from 'models/wallet/MainWalletModel'
import { type MultisigWalletModel as TMultisigWalletModel } from 'models/wallet/MultisigWalletModel'
import styles from './styles/WalletTransactionsStyles'

export type TWalletTransaction = {
  address: string,
  amount: number,
  confirmations: number,
  symbol: string,
  type: 'sending' | 'receiving',
}

export type TWalletTransactionList = TWalletTransaction[]

export type TWalletTransactionsProps = {
  address: string,
  wallet: any,
  balance: any,
  tokens: any,
  walletTransactions: TWalletTransactionList,
  mainWalletTransactionLoadingStatus: any,
}
export type TWalletTransactionsState = {}

export default class WalletTransactions extends PureComponent<TWalletTransactionsProps, TWalletTransactionsState> {

  getWalletMode = (walletInstance: TMainWalletModel | TMultisigWalletModel) => {
    let walletMode = '2fa'
    if (walletInstance && walletInstance.isMultisig()) {
      if (walletInstance.isTimeLocked()) {
        walletMode = 'timeLocked'
      } else {
        walletMode = 'shared'
      }
    }
    return walletMode
  }

  render () {

    const {
      address,
      wallet,
      balance,
      tokens,
      walletTransactions,
      mainWalletTransactionLoadingStatus,
    } = this.props

    const dataForDetailSection: TDetailSection = {
      mode: this.getWalletMode(wallet),
      balance,
      address,
      tokensLength: tokens && Object.keys(tokens).length || 0,
      size: 'big',
    }
  
    return (
      <ScrollView style={styles.mainSection}>
        <DetailsSection
          {...dataForDetailSection}
        />
        {
          false && // [AO] Disabled temporary: to be implemented
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
        }
        {
          mainWalletTransactionLoadingStatus.isFetching && !mainWalletTransactionLoadingStatus.isFetched ? (
            <View style={styles.transactionsListContainer}>
              <Text style={styles.transactionsListTitle}>
                  Loading Transactions ...
              </Text>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={styles.transactionsListContainer}>
              <Text style={styles.transactionsListTitle}>
                23 February 2018 (?)
              </Text>
              <Separator />
              <TransactionsList
                walletTransactions={walletTransactions}
              />
            </View>
          )
        }
      </ScrollView>
    )
  }
}
