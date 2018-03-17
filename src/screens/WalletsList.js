/* @flow */
import * as React from 'react'
import { SectionList } from 'react-native'
import I18n from 'react-native-i18n'
import SectionHeader from '../components/SectionHeader'
import WalletsListItem from '../components/WalletsListItem'
import images from '../assets/images'

export default class WalletsList extends React.Component {
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
      this.props.navigator.toggleDrawer()
    }
    if (type === 'NavBarButtonPress' && id === 'addWallet') {
      this.props.navigator.push({
        screen: 'AddWallet',
        title: I18n.t('AddWallet.title'),
      })
    }
  }

  keyExtractor = (item) => item.title

  renderItem = ({ item }) => <WalletsListItem {...item} />

  renderSectionHeader = ({ section }) => <SectionHeader {...section} />

  render () {
    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={walletSections}
        keyExtractor={this.keyExtractor}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
      />
    )
  }
}

const walletSections = [
  { title: 'Bitcoin wallets', data: [
    {
      title: 'Bitcoin Wallet',
      address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
      balance: { currency: 'BTC', amount: 15.2045 },
      exchange: { currency: 'USD', amount: 121600 },
      image: images.walletBitcoin,
      transactions: [
        { status: 'receiving' },
      ],
    },
  ] },
  { title: 'Ethereum wallets', data: [
    {
      title: 'My Wallet',
      address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
      balance: { currency: 'USD', amount: 1000 },
      tokens: [
        { id: 'ETH', amount: 10 },
        { id: 'TIME', amount: 10 },
      ],
      mode: 'default',
    },
    {
      title: 'My Shared Wallet',
      address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
      balance: { currency: 'USD', amount: 32020.41 },
      tokens: [
        { id: 'ETH', amount: 21 },
        { id: 'TIME', amount: 521.20 },
      ],
      transactions: [
        { status: 'receiving' },
        { status: 'receiving' },
      ],
      mode: 'shared',
    },
    {
      title: 'My Locked Wallet',
      address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
      balance: { currency: 'USD', amount: 32020.41 },
      tokens: [
        { id: 'ETH', amount: 21 },
        { id: 'TIME', amount: 10 },
        { id: 'TIME', amount: 10 },
        { id: 'TIME', amount: 10 },
      ],
      mode: 'locked',
    },
  ] },
]
