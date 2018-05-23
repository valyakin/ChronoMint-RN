/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import { type Navigator as TNavigator } from 'react-native-navigation'
import MainWalletModel from 'models/wallet/MainWalletModel'
import Separator from 'components/Separator'
import WalletOwners from 'containers/WalletOwnersContainer'
import WalletTemplates from 'containers/WalletTemplatesContainer'
import WalletTokens from 'containers/WalletTokensContainer'
import WalletTransactionsContainer from 'containers/WalletTransactionsContainer'
import { type TWalletTransaction } from './WalletTransactions'
import styles from './styles/WalletStyles'

export type TMainWalletModel = typeof MainWalletModel

export type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}

export type TActionButtonProps = {
  title: string,
  image: any,
  onPress?: () => void,
}

export type TTab = 'transactions' | 'tokens' | 'owners' | 'templates'

export type TWalletProps = {
  isMultisig: boolean,
  address: string,
  balance: any,
  blockchain: string,
  mainWalletTransactionLoadingStatus: any,
  navigator: TNavigator,
  prices: TPrices, // TODO: we do not need to get prices here and send it via props. It should be done on 'Send' screen
  tab: TTab,
  tokens: any,
  wallet: TMainWalletModel,
  walletTransactions: TWalletTransaction[],
  balanceCalc: number,
  onPressTabOwners(): void,
  onPressTabTemplates(): void,
  onPressTabTokens(): void,
  onPressTabTransactions(): void,
  onSend(): void,
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
    // console.log('Wallet: this.props', this.props)
    const {
      address,
      balance,
      balanceCalc,
      mainWalletTransactionLoadingStatus,
      onPressTabOwners,
      onPressTabTemplates,
      onPressTabTokens,
      onPressTabTransactions,
      onSend,
      tab,
      tokens,
      wallet,
      walletTransactions,
    } = this.props

    /**
     * [Alexey Ozerov] Need to clarify: does 'mode' used only for multisig?
     * Also need a better place for the mode "calculations"
     */
    let mode = '2fa'
    if (this.props.isMultisig) {
      if (wallet.isTimeLocked()) {
        mode = 'timeLocked'
      } else {
        mode = 'shared'
      }
    }

    return (
      <View style={styles.screenView}>
        <WalletTransactionsContainer
          address={address}
          balance={balanceCalc}
          tokens={tokens}
          wallet={wallet}
          mainWalletTransactionLoadingStatus={mainWalletTransactionLoadingStatus}
          walletTransactions={walletTransactions}
        />
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

    // THIS IS TEMPORARY DISABLED TABS. PLEASE KEEP IT AS IS
    //
    // return (
    //   <View style={styles.screenView}>
    //   {/*  <View style={styles.tabsContainer}>
    //       <Text
    //         style={styles.tabItem}
    //         onPress={onPressTabTransactions}
    //       >
    //         Transactions
    //       </Text>
    //       <Separator style={styles.separator} />*/}
    //       {/* Alexey Ozerov: Do not understand a logic here. We have array of tokens, which one should be compared with btc?
    //         this.props.wallet.token !== 'btc' && ([
    //           <Text
    //             style={styles.tabItem}
    //             onPress={onPressTabTokens}
    //             key='0'
    //           >
    //             Tokens
    //           </Text>,
    //           <Separator style={styles.separator} key='1' />,
    //         ])
    //       */}
    //       {/* mode === 'shared' && ([
    //         <Text
    //           style={styles.tabItem}
    //           onPress={onPressTabOwners}
    //           key='0'
    //         >
    //           Owners
    //         </Text>,
    //         <Separator
    //           style={styles.separator}
    //           key='1'
    //         />,
    //       ])*/}
    //       {/*<Text
    //         style={styles.tabItem}
    //         onPress={onPressTabTemplates}
    //       >
    //         Templates
    //       </Text>
    //     </View>*/}
    //     {/*
    //       tab === 'transactions' &&
    //         <WalletTransactionsContainer
    //           address={address}
    //           balance={balanceCalc}
    //           tokens={tokens}
    //           wallet={wallet}
    //           mainWalletTransactionLoadingStatus={mainWalletTransactionLoadingStatus}
    //           walletTransactions={walletTransactions}
    //         />
    //     */}
    //         <WalletTransactionsContainer
    //           address={address}
    //           balance={balanceCalc}
    //           tokens={tokens}
    //           wallet={wallet}
    //           mainWalletTransactionLoadingStatus={mainWalletTransactionLoadingStatus}
    //           walletTransactions={walletTransactions}
    //         />
    //     {/* tab === 'tokens' && <WalletTokens {...this.props} />}
    //     { tab === 'owners' && <WalletOwners {...this.props} />}
    //     { tab === 'templates' && <WalletTemplates {...this.props} />*/}
    //     <View style={styles.actions}>
    //       <ActionButton
    //         title={I18n.t('Wallet.send')}
    //         image={require('../images/send-ios.png')}
    //         onPress={onSend}
    //       />
    //       <ActionButton
    //         title={I18n.t('Wallet.receive')}
    //         image={require('../images/receive-ios.png')}
    //       />
    //     </View>
    //   </View>
    // )
  }
}
