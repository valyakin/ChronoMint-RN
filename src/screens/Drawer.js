/* @flow */
import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import I18n from 'react-native-i18n'
import colors from '../utils/colors'
import images from '../assets/images'

const CurrentNetwork = ({ network }) => (
  <View style={styles.currentNetworkContainer}>
    <Text style={styles.currentNetwork}>
      {network.toUpperCase()}
    </Text>
  </View>
)

class Item extends React.PureComponent {
  render () {
    return (
      <View style={styles.menuItem}>
        <Image source={this.props.image} style={styles.menuItemImage} />
        <Text style={styles.menuItemTitle}>
          {this.props.title}
        </Text>
      </View>
    )
  }
}

export default class Drawer extends React.Component {
  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <Item {...item} />

  render () {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
      >
        <CurrentNetwork network='Rinkeby (test network)' />
        <Image
          source={images.profilePhoto1}
          style={styles.profilePhoto}
        />
        <View style={styles.separator} />
        <View style={styles.account}>
          <Text style={styles.accountName}>Account name</Text>
          <TouchableOpacity style={styles.accountAction}>
            <Image source={images.cog} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountAction}>
            <Image source={images.onOff} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={menuItems}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          style={styles.menu}
          numColumns={2}
          scrollEnabled={false}
        />
        <View style={styles.addressSection}>
          <View style={styles.address}>
            <Text style={styles.mainAddressLabel}>
              {I18n.t('Drawer.mainAddress')}
            </Text>
            <Text style={styles.mainAddress}>
              0x19e7e376e7c213b7e7e7e46cc70a5dd086daff2a
            </Text>
          </View>
          <TouchableOpacity style={styles.accountAction}>
            <Image source={images.qr} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountAction}>
            <Image source={images.copy} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  currentNetwork: {
    color: colors.background,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
  },
  currentNetworkContainer: {
    backgroundColor: colors.green,
    paddingVertical: 4,
    paddingHorizontal: 24,
    borderRadius: 10,
    margin: 16,
  },
  profilePhoto: {
    width: 98,
    height: 98,
    borderRadius: 49,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.background,
    opacity: .2,
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountName: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 20,
    fontWeight: '700',
    color: colors.background,
  },
  accountAction: {
    opacity: .25,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    backgroundColor: colors.background,
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#F7F7F7',
  },
  menuItemImage: {
    tintColor: colors.primary,
  },
  menuItemTitle: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  mainAddress: {
    color: colors.background,
    fontSize: 12,
  },
  mainAddressLabel: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 4,
  },
})

const menuItems = [
  {
    id: 'wallets',
    title: I18n.t('Drawer.wallets'),
    image: images.wallet,
  },
  {
    id: 'deposits',
    title: I18n.t('Drawer.deposits'),
    image: images.deposit,
  },
  {
    id: 'exchange',
    title: I18n.t('Drawer.exchange'),
    image: images.exchange,
  },
  {
    id: 'voting',
    title: I18n.t('Drawer.voting'),
    image: images.checkFilled,
  },
  {
    id: 'bonuses',
    title: I18n.t('Drawer.bonuses'),
    image: images.gift,
  },
  {
    id: 'assets',
    title: I18n.t('Drawer.assets'),
    image: images.portfolio,
  },
  {
    id: 'portfolio',
    title: I18n.t('Drawer.portfolio'),
    image: images.pieChart,
  },
]
