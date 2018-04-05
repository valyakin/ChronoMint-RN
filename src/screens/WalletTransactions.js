/* @flow */
import * as React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import WalletImage from '../components/WalletImage'
import WalletAlert from '../components/WalletAlert'
import TransactionsList from '../components/TransactionsList'
import Separator from '../components/Separator'
import colors from '../utils/colors'
import {
  type TBalance,
  type TWalletMode,
  type TWallet,
} from '../types'

export default class WalletTransactions extends React.Component<{ wallet: TWallet }> {

  render () {
    const {
      address,
      balance,
      mode,
      tokens,
    } = this.props.wallet

    return (
      <ScrollView style={styles.mainSection}>
        <DetailsSection
          mode={mode}
          balance={balance}
          address={address}
          tokensLength={tokens && tokens.length || 0}
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

const DetailsSection = (
  {
    mode,
    address,
    balance,
    tokensLength,
  }: {
    mode?: TWalletMode,
    address: string, 
    balance: TBalance,
    tokensLength: number,
  }
) => (
  <View style={styles.walletDetailsSection}>
    <WalletImage
      walletMode={mode}
      shapeStyle={styles.walletImageShape}
      imageStyle={styles.walletImageIcon}
    />
    <Text style={styles.address}>{address}</Text>
    <Text style={styles.balance}>
      USD&nbsp;
      {I18n.toNumber(balance.amount, { precision: 2 })}
    </Text>
    <Text style={styles.walletDetails}>
      {tokensLength} Tokens
    </Text>
  </View>
)

const styles = StyleSheet.create({
  mainSection: {
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  walletImageShape: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  walletImageIcon: {
    width: 38,
    height: 38,
  },
  walletDetailsSection: {
    backgroundColor: '#302D59',
    borderRadius: 3,
    alignItems: 'center',
    padding: 24,
  },
  walletDetails: {
    color: '#A3A3CC',
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
  address: {
    color: colors.background,
    fontSize: 11,
    fontWeight: '600',
    marginVertical: 16,
  },
  balance: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '700',
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
