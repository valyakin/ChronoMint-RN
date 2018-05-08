/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import {
  ActivityIndicator,
  SectionList,
  View,
} from 'react-native'
import MainWalletModel from 'models/wallet/MainWalletModel'
import SectionHeader from 'components/SectionHeader'
import WalletsListItem from 'components/WalletsListItem'
import styles from './styles/WalletsListStyles'

export type TMainWalletModel = typeof MainWalletModel

type TWalletItem = {
  address: string,
  wallet: TMainWalletModel,
}

export type TWalletListSection = {
  title: string,
  data: TWalletItem[],
}

type TRenderItemArgs = {
  item: TWalletItem,
  index: number,
  section: TWalletListSection,
}

type IWalletsListProps = {
  selectWallet(wallet: TMainWalletModel, address: string): void,
  sections: TWalletListSection[],
  isRefreshing?: boolean,
  onRefresh: () => void,
}

export default class WalletsList extends PureComponent<IWalletsListProps> {
  keyExtractor = ( section: TWalletListSection, index: number ) => [section.title, index].join('')

  renderItem = ({ item, index, section }: TRenderItemArgs) => (
    <View style={styles.walletItemHorizontalPaddings}>
      <WalletsListItem
        address={item.address}
        index={index}
        navigator={this.props.navigator}
        sectionName={section.title}
        selectWallet={this.props.selectWallet}
        wallet={item.wallet}
      />
    </View>
  )

  renderSectionHeader = ({ section }: { section: TWalletListSection }) =>
    (<SectionHeader
      title={`${section.title} Wallets`}
      isDark
    />)

  render () {
    const {
      isRefreshing,
      sections,
      onRefresh,
    } = this.props

    if (isRefreshing || !sections) {
      return <ActivityIndicator />
    }

    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={this.props.sections}
        keyExtractor={this.keyExtractor}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        stickySectionHeadersEnabled={false}
      />
    )
  }
}
