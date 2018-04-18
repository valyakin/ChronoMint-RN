/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  SectionList,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import { sectionsSelector } from 'redux/session/selectors'
import { switchWallet } from 'redux/wallet/actions'
import MainWalletModel from 'models/wallet/MainWalletModel'
import SectionHeader from 'components/SectionHeader'
import WalletsListItem from 'components/WalletsListItem'
import styles from './styles/WalletsListStyles'

type TMainWalletModel = typeof MainWalletModel

type TWalletListState = {
  refreshing: boolean,
}

type TWalletItem = {
  address: string,
  wallet: TMainWalletModel,
}

type TWalletListSection = {
  title: string,
  data: TWalletItem[],
}

type TRenderItemArgs = {
  item: TWalletItem,
  index: number,
  section: TWalletListSection,
}

type TOnNavigatorEventArgs = {
  id: string,
  type: string,
}

const mapStateToProps = (state) => ({
  sections: sectionsSelector()(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet: TMainWalletModel, address: string) =>
    dispatch(switchWallet(wallet, address)),
})

interface IWalletsListProps {
  selectWallet(wallet: TMainWalletModel, address: string): void,
  navigator: any, // TODO: to implement a flow type for navigator
  sections: TWalletListSection[],
}

class WalletsList extends PureComponent<IWalletsListProps, TWalletListState> {

  // noinspection JSUnusedGlobalSymbols
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'drawer',
        icon: require('../images/burger.png'),
      },
    ],
    rightButtons : [
      {
        id: 'addWallet',
        icon: require('../images/plus.png'),
      },
    ],
  }

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  state = {
    refreshing: false,
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    })

    setTimeout(() => this.setState({ refreshing: false }), 1000)
  }

  onNavigatorEvent = ({ type, id }: TOnNavigatorEventArgs) => {
    if (type === 'NavBarButtonPress' && id === 'drawer') {
      this.props.navigator.toggleDrawer({ side: 'left' })
    }
    if (type === 'NavBarButtonPress' && id === 'addWallet') {
      this.props.navigator.push({
        screen: 'AddWallet',
        title: I18n.t('AddWallet.title'),
      })
    }
  }

  keyExtractor = ( section: TWalletListSection, index: number ) => [section.title, index].join('')

  renderItem = ({ item, index, section }: TRenderItemArgs) => (
    <View style={styles.walletItemHorizontalPaddings}>
      <WalletsListItem
        wallet={item.wallet}
        index={index}
        address={item.address}
        sectionName={section.title}
        selectWallet={this.props.selectWallet}
        navigator={this.props.navigator}
      />
    </View>
  )

  renderSectionHeader = ({ section }: { section: TWalletListSection }) => (
    <SectionHeader title={`${section.title} Wallets`} isDark />
  )

  render () {

    if (this.state.refreshing || !this.props.sections) {
      return <ActivityIndicator />
    }

    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={this.props.sections}
        keyExtractor={this.keyExtractor}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        stickySectionHeadersEnabled={false}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsList)
