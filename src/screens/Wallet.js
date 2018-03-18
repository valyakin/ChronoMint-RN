/* @flow */
import * as React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import I18n from 'react-native-i18n'
import images from '../assets/images'
import colors from '../utils/colors'
import WalletImage from '../components/WalletImage'
import WalletAlert from '../components/WalletAlert'
import Separator from '../components/Separator'
import TransactionsList from '../components/TransactionsList'

const ActionButton = ({ title, image }) => (
  <TouchableOpacity style={styles.actionButton}>
    <Image source={image} style={styles.actionIcon} />
    <Text style={styles.actionTitle}>
      {title}
    </Text>
  </TouchableOpacity>
)

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

export default class Wallet extends React.Component {
  static defaultProps = {
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
    mode: 'shared',
    balance: { id: 'usd', amount: 32020.41 },
  }

  render () {
    const { mode, address, balance } = this.props
    return (
      <View style={styles.screenView}>
        <Tabs navigator={this.props.navigator} />
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
              source={images.profile}
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
        <View style={styles.actions}>
          <ActionButton
            title={I18n.t('Wallet.send')}
            image={images.send}
          />
          <ActionButton
            title={I18n.t('Wallet.receive')}
            image={images.send}
          />
        </View>
      </View>
    )
  }
}

export class Tabs extends React.Component {
  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <TabItem {...item} navigator={this.props.navigator} /> 

  render () {
    return (
      <FlatList
        data={tabs}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        horizontal
        style={styles.tabContainer}
      />
    )
  }
}

class TabItem extends React.Component {
  handlePress = () => {
    const { screen, navigator } = this.props

    navigator.push({ screen })
  }
  render () {
    const { title } = this.props
    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={this.handlePress}
      >
        <Text style={styles.tabItemText}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  screenView: { flex: 1 },
  tabContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    flexGrow: 0,
  },
  tabItem: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  tabItemText: {
    color: colors.background,
    fontSize: 12,
  },
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
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  actionIcon: {
    tintColor: colors.background,
  },
  actionTitle: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
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

const tabs = [
  {
    id: 'walletTransactions',
    title: 'Transactions',
    screen: 'Wallet',
  },
  {
    id: 'walletTokens',
    title: 'Tokens',
    screen: 'WalletTokens',
  },
  {
    id: 'walletOwners',
    title: 'Owners',
    screen: 'WalletOwners',
  },
  {
    id: 'walletTemplates',
    title: 'Templates',
    screen: 'WalletTemplates',
  },
]
