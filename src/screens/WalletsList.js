/* @flow */
import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  SectionList,
} from 'react-native'
import I18n from 'react-native-i18n'

import SectionHeader from 'components/SectionHeader'
import WalletsListItem, {
  WalletListItemProps,
} from 'components/WalletsListItem'
import { getSectionedBalances } from 'redux/session/selectors'
import BalanceModel from 'models/tokens/BalanceModel'

// TODO: add fallback for coins' icons
//import { TOKEN_ICONS } from 'assets'

type WalletListSection = {
  data: BalanceModel[],
  title: string,
}

type WalletsListState = {
  refreshing: boolean,
}

type WalletsListProps = {
  walletSections: WalletListSection[],
}

const mapStateToProps = (state): { walletSections: WalletListSection[] } => ({
  walletSections: getSectionedBalances()(state),
})

@connect(mapStateToProps)
export default class WalletsList extends PureComponent<WalletsListProps, WalletsListState> {

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
    this.setState({ refreshing: true })

    setTimeout(() => this.setState({ refreshing: false }), 1000)
  }

  onNavigatorEvent = ({ type, id }) => {
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

  keyExtractor = (item) => item.title

  renderItem = ({ item }) => {
    return <WalletsListItem {...item} navigator={this.props.navigator} />
  }

  renderSectionHeader = ({ section }) => <SectionHeader {...section} isDark />

  render () {
    return (
      (this.state.refreshing || !this.props.walletSections.length) ?
        <ActivityIndicator /> :
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.props.walletSections}
          keyExtractor={this.keyExtractor}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        />
    )
  }
}

