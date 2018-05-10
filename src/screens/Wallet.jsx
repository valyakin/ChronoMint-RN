/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import colors from 'utils/colors'
import MainWalletModel from 'models/wallet/MainWalletModel'
import Separator from 'components/Separator'
import WalletOwners from '../containers/WalletOwnersContainer'
import WalletTemplates from '../containers/WalletTemplatesContainer'
import WalletTokens from '../containers/WalletTokensContainer'
import WalletTransactions from '../containers/WalletTransactionsContainer'

export type TMainWalletModel = typeof MainWalletModel

type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}

type TActionButtonProps = {
  title: string,
  image: any,
  onPress?: () => void,
}

export type TTab = 'transactions' | 'tokens' | 'owners' | 'templates'

type TWalletProps = {
  address: string,
  balance: any,
  blockchainTitle: string,
  onPressTab: (tab: TTab) => () => void,
  onSend: () => void,
  prices: TPrices, // TODO: we do not need to get prices here and send it via props. It should be done on 'Send' screen
  tab: TTab,
  tokens: any,
  wallet: TMainWalletModel,
}

const ActionButton = ({ title, image, onPress }: TActionButtonProps) => (
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

export default class Wallet extends PureComponent<TWalletProps, {}> {
  render () {
    const {
      tab,
      onPressTab,
      onSend,
    } = this.props

    const {
      address,
      wallet,
      balance,
      tokens,
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
      <View style={styles.screenView}>
        <View style={styles.tabsContainer}>  
          <Text
            style={styles.tabItem}
            onPress={onPressTab('transactions')}
          >
            Transactions
          </Text>
          <Separator style={styles.separator} />
          {/* Alexey Ozerov: Do not understand a logic here. We have array of tokens, which one should be compared with btc?
            this.props.wallet.token !== 'btc' && ([
              <Text
                style={styles.tabItem}
                onPress={handleTokensTabClick}
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
              onPress={onPressTab('owners')}
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
            onPress={onPressTab('templates')}
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
            onPress={onSend}
          />
          <ActionButton
            title={I18n.t('Wallet.receive')}
            image={require('../images/receive-ios.png')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 4,
  },
  actionIcon: {
    tintColor: colors.background,
  },
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  actionTitle: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  screenView: {
    flex: 1,
  },
  separator: {
    backgroundColor: colors.primary,
  },
  tabItem: {
    backgroundColor: '#4e3d99',
    color: colors.background,
    fontSize: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tabsContainer: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
})
