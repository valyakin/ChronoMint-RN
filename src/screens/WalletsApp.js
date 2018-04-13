/* @flow */
import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  SectionList, // https://facebook.github.io/react-native/docs/sectionlist.html
  View,
} from 'react-native'
import { BLOCKCHAIN_ETHEREUM } from 'dao/EthereumDAO'
import SectionHeader from 'components/SectionHeader'
import WalletPanel from 'components/WalletPanel'
import {
  makeGetSectionedWallets, 
} from 'redux/wallet/selectors'

const makeMapStateToProps = () => {
  const getSectionedWallets = makeGetSectionedWallets()
  const mapStateToProps = (state, props) => {
    return {
      walletsSections: getSectionedWallets(state, props),
    }
  }
  return mapStateToProps
}

/**
 * Screen "Wallets App": a list of all activated wallets divided by blockchains
 *
 * @version 0.0.1
 * @author [Alexey Ozerov](https://github.com/ozalexo)
 */
@connect(makeMapStateToProps/*, mapDispatchToProps*/)
export default class WalletsApp extends PureComponent {

    /**
     * Navigation bar:
     * Left: Main Menu (burger) button
     * Right: Add wallet (plus) button
     */
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

    keyExtractor = (item, index) => item + index
    /**
     * Draw section title, e.g. "My Bitcoin Wallets"
     * @param {string} title Usually it is the title of a blockchain, e.g. "Bitcoin" or "Etheresum"
     */
    renderSectionHeader = ({ section: { title } }) => {
      // Only Ethereum section may have more than one wallet
      const pluralWallets: string = BLOCKCHAIN_ETHEREUM === title
        ? 'Wallets'
        : 'Wallet'
      const sectionFullTitle: string = ['My', title, pluralWallets].join(' ')

      return (
        <SectionHeader
          title={sectionFullTitle}
          isDark
        />
      )
    }

    /**
     * Draw section item: clickable wallet's panel with title, balance and tokens
     * @param {string} walletAddress This is wallet's address, indeed.
     */
    renderWalletPanel = ({ item, index, section }) => (
      <WalletPanel
        walletAddress={item}
        blockchainTitle={section.title}
      />
    )

    /**
     * To render SectionsList we need to get data in the following format:
     * {
     *   title: 'Ethereum',
     *   data: [
     *     '0x281055afc982d96fab65b3a49cac8b878184cb16',
     *     '0x6f46cf5569aefa1acc1009290c8e043747172d89'
     *   ]
     * }
     * 
     * Using getSectionedWalletsList selector from wallet/selectors
     */
    render () {
      console.log(this.props.walletsSections)
      return (
        <SectionList
          stickySectionHeadersEnabled={false}
          renderItem={this.renderWalletPanel}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.props.walletsSections}
          keyExtractor={this.keyExtractor}
        />
      )
    }
}
