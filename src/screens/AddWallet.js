/* @flow */
import * as React from 'react'
import { FlatList, Text, View, StyleSheet, Image } from 'react-native'
import I18n from 'react-native-i18n'
import colors from '../utils/colors'
import images from '../assets/images'

const Separator = () => <View style={styles.separator} />

const Item = ({ title, image }) => (
  <View style={styles.itemContainer}>
    { (typeof image !== 'undefined') &&
      <Image source={image} style={styles.itemImage} />
    }
    <Text style={styles.itemTitle}>{title}</Text>
    <Image source={images.chevronRight} />
  </View>
)

export default class AddWallet extends React.Component {

  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <Item {...item} />

  render () {
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={Separator}
        style={styles.screen}
      />
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  separator: {
    backgroundColor: colors.gray,
    height: 1,
  },
  itemContainer: {
    margin: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: 16,
    flexGrow: 1,
  },
  itemImage: {
    width: 32,
    height: 32,
  },
})

const data = [
  {
    id: 'bitcoin',
    title: I18n.t('AddWallet.bitcoinWallet'),
    image: images.walletBitcoin,
  },
  {
    id: 'litecoin',
    title: I18n.t('AddWallet.litecoinWallet'),
    image: images.walletLitecoin,
  },
  {
    id: 'ethereum',
    title: I18n.t('AddWallet.ethereumWallet'),
    image: images.walletEthereum,
  },
  {
    id: 'nem',
    title: I18n.t('AddWallet.nemWallet'),
    image: images.walletNem,
  },
]
