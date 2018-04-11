/* @flow */
import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  SectionList,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'

import { getAccountTransactions } from 'redux/mainWallet/actions'
import {
  sectionsSelector,
} from 'redux/session/selectors'
import SectionHeader from 'components/SectionHeader'
import WalletsListItem from 'components/WalletsListItem'
import { switchWallet } from 'redux/wallet/actions'
import MainWalletModel from 'models/wallet/MainWalletModel'
import MultisigWalletModel from 'models/wallet/MultisigWalletModel'

import styles from './styles/WalletsListStyles'

type TMainWalletModel = typeof MainWalletModel
type TMultisigWalletModel = typeof MultisigWalletModel

type WalletsListState = {
  refreshing: boolean,
}

type WalletListProps = {
  newWallets: {
    main: TMainWalletModel,
    multisig: {
      active: TMultisigWalletModel[],
      timeLocked: TMultisigWalletModel[],
    }
  },
  navigator: any,
}

const mapStateToProps = (state) => ({
  sections: sectionsSelector()(state),
})

const mapDispatchToProps = (dispatch) => ({
  getAccountTransactions: () => dispatch(getAccountTransactions()),
  selectWallet: (wallet, address) => dispatch(switchWallet(wallet, address)),
})

@connect(mapStateToProps, mapDispatchToProps)
export default class WalletsList extends PureComponent<WalletListProps, WalletsListState> {

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

  constructor (props: WalletListProps) {
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

  keyExtractor = ( section, index ) => [section.title, index].join('')

  renderItem = ({ item, index, section }) => (
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

  renderSectionHeader = ({ section }) => (
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
