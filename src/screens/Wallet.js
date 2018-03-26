/* @flow */
import * as React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import I18n from 'react-native-i18n'
import images from '../assets/images'
import colors from '../utils/colors'
import Separator from '../components/Separator'
import WalletTransactions from './WalletTransactions'
import WalletOwners from './WalletOwners'
import WalletTokens from './WalletTokens'
import WalletTemplates from './WalletTemplates'

type ActionButtonProps = {
  title: string,
  image: number,
  onPress: () => void,
}

const ActionButton = ({ title, image, onPress }: ActionButtonProps) => (
  <TouchableOpacity
    style={styles.actionButton}
    onPress={onPress}
  >
    <Image source={image} style={styles.actionIcon} />
    <Text style={styles.actionTitle}>
      {title}
    </Text>
  </TouchableOpacity>
)

export default class Wallet extends React.Component {
  state = {
    tab: 'transactions',
  }

  handleTransactions = () => {
    this.setState({ tab: 'transactions' })
  }

  handleTokens = () => {
    this.setState({ tab: 'tokens' })
  }

  handleOwners = () => {
    this.setState({ tab: 'owners' })
  }

  handleTemplates = () => {
    this.setState({ tab: 'templates' })
  }

  handleSend = () => {
    this.props.navigator.push({ screen: 'Send' })
  }

  render () {
    const { tab } = this.state
    const { mode } = this.props
    
    return (
      <View style={styles.screenView}>
        <View style={styles.tabsContainer}>  
          <Text style={styles.tabItem} onPress={this.handleTransactions}>
            Transactions
          </Text>
          <Separator style={styles.separator} />
          { this.props.token !== 'btc' && ([
            <Text style={styles.tabItem} onPress={this.handleTokens} key='0'>
              Tokens
            </Text>,
            <Separator style={styles.separator} key='1' />,
          ])}
          { mode === 'shared' && ([
            <Text style={styles.tabItem} onPress={this.handleOwners} key='0'>
              Owners
            </Text>,
            <Separator style={styles.separator} key='1' />,
          ])}
          <Text style={styles.tabItem} onPress={this.handleTemplates}>
            Templates
          </Text>
        </View>
        { tab === 'transactions' && <WalletTransactions {...this.props} />}
        { tab === 'tokens' && <WalletTokens {...this.props} />}
        { tab === 'owners' && <WalletOwners {...this.props} />}
        { tab === 'templates' && <WalletTemplates {...this.props} />}
        <View style={styles.actions}>
          <ActionButton
            title={I18n.t('Wallet.send')}
            image={images.send}
            onPress={this.handleSend}
          />
          <ActionButton
            title={I18n.t('Wallet.receive')}
            image={images.receive}
          />
        </View>
      </View>
    )
  }
}

export class Tabs extends React.Component {

  handleTokens = () => {
    this.props.navigator.pop({ animationType: 'fade' })
    this.props.navigator.push({ screen: 'WalletTokens', animationType: 'fade' })
  }

  handleOwners = () => {
    this.props.navigator.pop({ animationType: 'fade' })
    this.props.navigator.push({ screen: 'WalletOwners', animationType: 'fade' })
  }

  handleTemplates = () => {
    this.props.navigator.pop({ animationType: 'fade' })
    this.props.navigator.push({ screen: 'WalletTemplates', animationType: 'fade' })
  }

  render () {
    return (
      <View style={styles.tabsContainer}>  
        <Text style={styles.tabItem}>
          Transactions
        </Text>
        <Separator style={styles.separator} />
        <Text style={styles.tabItem} onPress={this.handleTokens}>
          Tokens
        </Text>
        <Separator style={styles.separator} />
        <Text style={styles.tabItem} onPress={this.handleOwners}>
          Owners
        </Text>
        <Separator style={styles.separator} />
        <Text style={styles.tabItem} onPress={this.handleTemplates}>
          Templates
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenView: { flex: 1 },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
  separator: {
    backgroundColor: colors.primary,
  },
  tabItem: {
    backgroundColor: '#4e3d99',
    paddingVertical: 8,
    paddingHorizontal: 14,
    color: colors.background,
    fontSize: 12,
  },
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  actionIcon: {
    tintColor: colors.background,
  },
  actionTitle: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
})
