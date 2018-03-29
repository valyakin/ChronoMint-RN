/* @flow */
import * as React from 'react'
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native'
import I18n from 'react-native-i18n'
import WalletImage from '../components/WalletImage'
import WalletAlert from '../components/WalletAlert'
import TransactionsList from '../components/TransactionsList'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export default class WalletTransactions extends React.Component {
  static defaultProps = {
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
    mode: 'shared',
    balance: { id: 'usd', amount: 32020.41 },
  }

  render () {
    const { address, mode, balance } = this.props
    return (
      <ScrollView style={styles.mainSection}>
        <DetailsSection
          walletMode={mode}
          balance={balance}
          address={address}
        />
        <WalletAlert
          title='23 February 2018'
          style={styles.walletAlert}
          actions={[
            { id: 'revoke', title: I18n.t('Wallet.revoke') },
            { id: 'sign', title: I18n.t('Wallet.sign'), isMain: true },
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

const DetailsSection = ({ walletMode, address, balance }) => (
  <View style={styles.walletDetailsSection}>
    <WalletImage
      walletMode={walletMode}
      shapeStyle={styles.walletImageShape}
      imageStyle={styles.walletImageIcon}
    />
    <Text style={styles.address}>{address}</Text>
    <Text style={styles.balance}>
      {I18n.t(balance.id)}&nbsp;
      {I18n.toNumber(balance.amount, { precision: 2 })}
    </Text>
    <Text style={styles.walletDetails}>
      36 Tokens, 3 Owners
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
