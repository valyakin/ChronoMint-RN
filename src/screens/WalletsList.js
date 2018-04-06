/* @flow */
import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  SectionList,
} from 'react-native'
import I18n from 'react-native-i18n'

import { getAccountTransactions } from 'redux/mainWallet/actions'

import SectionHeader from 'components/SectionHeader'
import WalletsListItem from 'components/WalletsListItem'
import { getSectionedBalances } from 'redux/session/selectors'
// import BalanceModel from '../../mint/src/models/tokens/BalanceModel'
import {
  type TWallet,
  type TWalletSectionList,
  type TWalletSection,
} from '../types'

// TODO: add fallback for coins' icons
//import { TOKEN_ICONS } from 'assets'

type WalletsListState = {
  refreshing: boolean,
}

type WalletListProps = {
  walletSections: TWalletSectionList,
  // navigator: any, // FIXME: need to discover flow type for this
}

const mapStateToProps = (state): { walletSections: TWalletSectionList } => ({
  walletSections: getSectionedBalances()(state),
})

const mapDispatchToProps = (dispatch) => ({
  getAccountTransactions: () => dispatch(getAccountTransactions()),
})

@connect(mapStateToProps, mapDispatchToProps)
export default class WalletsList extends PureComponent {

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

  onNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
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

  keyExtractor = ( section: TWalletSection ) => section.title

  renderItem = ({ item }: { item: TWallet }) => <WalletsListItem wallet={item} navigator={this.props.navigator} />

  renderSectionHeader = ({ section }: { section: TWalletSection}) => <SectionHeader title={section.title} isDark />

  render () {

    if (this.state.refreshing || !(this.props.walletSections && this.props.walletSections.length)) {
      return <ActivityIndicator />
    }

    return (
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

