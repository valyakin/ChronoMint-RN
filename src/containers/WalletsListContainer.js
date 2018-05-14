/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { type Dispatch } from 'redux'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { sectionsSelector } from 'redux/session/selectors'
import { switchWallet } from 'redux/wallet/actions'
import WalletsList, {
  type TMainWalletModel,
  type TWalletListSection,
} from '../screens/WalletsList'

type TWalletsListContainerProps = {
  selectWallet(
    wallet: TMainWalletModel,
    address: string,
    blockchainTitle: string
  ): void,
  navigator: any,
  sections: TWalletListSection[],
}

type TWalletsListContainerState = {
  isRefreshing: boolean,
}

class WalletsListContainer extends PureComponent<TWalletsListContainerProps, TWalletsListContainerState> {
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
    isRefreshing: false,
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true,
    })

    setTimeout(() => this.setState({ isRefreshing: false }), 1000)
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

  render () {
    return (
      <WalletsList
        isRefreshing={this.state.isRefreshing}
        navigator={this.props.navigator}
        onRefresh={this.handleRefresh}
        sections={this.props.sections}
        selectWallet={this.props.selectWallet}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  sections: sectionsSelector()(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  selectWallet: (wallet: TMainWalletModel, address: string, blockchainTitle: string) =>
    dispatch(switchWallet(wallet, address, blockchainTitle)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WalletsListContainer)
