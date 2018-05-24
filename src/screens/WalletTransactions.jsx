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
  Text,
} from 'react-native'
import I18n from 'react-native-i18n'
import { type TWalletMode } from 'components/WalletImage'
import DetailsSection, { type TDetailSection } from 'components/DetailsSection'
// import Separator from 'components/Separator'
import styles from 'screens/styles/WalletTransactionsStyles'
import TransactionsListContainer from 'containers/TransactionsListContainer'
import WalletAlert from 'components/WalletAlert'

export type TWalletTransactionsProps = {
  address: string,
  walletMode?: ?TWalletMode,
  balance: any,
  blockchain: string,
  tokensLength: number,
}
export type TWalletTransactionsState = {}

export default class WalletTransactions extends PureComponent<TWalletTransactionsProps, TWalletTransactionsState> {

  render () {
    const {
      address,
      balance,
      blockchain,
      walletMode,
      tokensLength,
    } = this.props

    const dataForDetailSection: TDetailSection = {
      address,
      balance,
      blockchain,
      tokensLength,
      walletMode,
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
        <TransactionsListContainer />
      </ScrollView>
    )
  }
}
