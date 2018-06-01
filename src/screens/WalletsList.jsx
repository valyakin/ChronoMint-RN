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
import WalletsListItemContainer from 'containers/WalletsListItemContainer'
import styles from './styles/WalletsListStyles'

type TWalletItem = {
  address: string,
  wallet: MainWalletModel,
}

export type TWalletListSection = {
  data: TWalletItem[],
  title: string,
}

type TRenderItemArgs = {
  index: number,
  item: TWalletItem,
  section: TWalletListSection,
}

export type TWalletsListProps = {
  isRefreshing: boolean,
  navigator: any,
  sections: TWalletListSection[],
  onRefresh(): void,
}

export default class WalletsList extends PureComponent<TWalletsListProps> {

  keyExtractor = ( section: TWalletListSection, index: number) =>
    [section.blockchain, section.address, index].join('_').replace(/\s/g, '')

  renderItem = ({ item, section }: TRenderItemArgs) => (
    <View style={styles.walletItemHorizontalPaddings}>
      <WalletsListItemContainer
        address={item.address}
        navigator={this.props.navigator}
        blockchain={section.title}
      />
    </View>
  )

  renderSectionHeader = ({ section }: { section: TWalletListSection }) => (
    <SectionHeader
      title={`${section.title} Wallets`}
      isDark
    />
  )

  render () {
    const {
      isRefreshing,
      sections,
      onRefresh,
    } = this.props

    if (isRefreshing || !sections || !sections.length) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={sections}
        keyExtractor={this.keyExtractor}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        stickySectionHeadersEnabled={false}
      />
    )
  }
}
