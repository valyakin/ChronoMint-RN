/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import I18n from 'react-native-i18n'
// import {
//   getSelectedWalletStore,
// } from 'redux/session/selectors'
import colors from 'utils/colors'
import Separator from 'components/Separator'
import WalletOwners from './WalletOwners'
import WalletTemplates from './WalletTemplates'
import WalletTokens from './WalletTokens'
import WalletTransactions from './WalletTransactions'

type ActionButtonProps = {
  title: string,
  image: number,
  onPress: () => void,
}

const ActionButton = ({ title, image, onPress }: ActionButtonProps) => (
  <TouchableOpacity
    style={styles.actionButton}
    onPress={onPress}
  >
    <Image
      source={image}
      style={styles.actionIcon}
    />
    <Text style={styles.actionTitle}>
      {title}
    </Text>
  </TouchableOpacity>
)

/**
 * Tabs IDs for Wallet screen. Used to switch between tabs.
 */
type TTabs = 'transactions' | 'tokens' | 'owners' | 'templates'

export default class Wallet extends React.PureComponent {

  state = {
    tab: 'transactions',
  }

  handleTabClick = (tabName: TTabs) => {
    this.setState({ tab: tabName })
  }

  handleSend = (props): void => {
    const {
      address,
      balance,
      blockchainTitle,
      prices,
      tokens,
      wallet,
    } = props

    props.navigator.push({
      screen: 'Send',
      title: 'Send Funds',
      passProps: {
        address: address,
        balance: balance,
        blockchainTitle: blockchainTitle,
        prices: prices,
        selectedBlockchainName: blockchainTitle,
        tokens: tokens,
        wallet: wallet,
        walletAddress: address,

      },
    })
  }

  handleNothing = () => {}

  render () {
    const { tab } = this.state

    const {
      address,
      wallet,
      balance,
      tokens,
    } = this.props
    console.log('Wallet this.props', this.props)
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
      <View style={styles.screenView}>
        <View style={styles.tabsContainer}>  
          <Text
            style={styles.tabItem}
            onPress={() => this.handleTabClick('transactions')}
          >
            Transactions
          </Text>
          <Separator style={styles.separator} />
          {/* Alexey Ozerov: Do not understand a logic here. We have array of tokens, which one should be compared with btc?
            this.props.wallet.token !== 'btc' && ([
              <Text
                style={styles.tabItem}
                onPress={() => this.handleTabClick('tokens)}
                key='0'
              >
                Tokens
              </Text>,
              <Separator style={styles.separator} key='1' />,
            ])
          */}
          { mode === 'shared' && ([
            <Text
              style={styles.tabItem}
              onPress={() => this.handleTabClick('owners')}
              key='0'
            >
              Owners
            </Text>,
            <Separator
              style={styles.separator}
              key='1'
            />,
          ])}
          <Text
            style={styles.tabItem}
            onPress={() => this.handleTabClick('templates')}
          >
            Templates
          </Text>
        </View>
        {
          tab === 'transactions' &&
            <WalletTransactions
              address={address}
              balance={balance}
              tokens={tokens}
              wallet={wallet}
            />
        }
        { tab === 'tokens' && <WalletTokens {...this.props} />}
        { tab === 'owners' && <WalletOwners {...this.props} />}
        { tab === 'templates' && <WalletTemplates {...this.props} />}
        <View style={styles.actions}>
          <ActionButton
            title={I18n.t('Wallet.send')}
            image={require('../images/send-ios.png')}
            onPress={() => this.handleSend(this.props)}
          />
          <ActionButton
            title={I18n.t('Wallet.receive')}
            image={require('../images/receive-ios.png')}
            onPress={this.handleNothing}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenView: { flex: 1 },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
  separator: {
    backgroundColor: colors.primary,
  },
  tabItem: {
    backgroundColor: '#4e3d99',
    paddingVertical: 8,
    paddingHorizontal: 14,
    color: colors.background,
    fontSize: 12,
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
