/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import { FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import Separator from '../components/Separator'
import colors from '../utils/colors'

class Item extends React.Component {
  handlePress = () => {
    this.props.navigator.push({
      screen: 'AddEthereumWallet',
    })
  }
  render () {
    const { title, image } = this.props

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={this.handlePress}
      >
        { (typeof image !== 'undefined') &&
          <Image source={image} style={styles.itemImage} />
        }
        <Text style={styles.itemTitle}>{title}</Text>
        <Image source={require('../images/chevron-right.png')} />
      </TouchableOpacity>
    )
  }
}
export default class AddWallet extends React.Component {

  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <Item {...item} navigator={this.props.navigator} />

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
    image: require('../images/coin-bitcoin-big.png'),
  },
  {
    id: 'litecoin',
    title: I18n.t('AddWallet.litecoinWallet'),
    image: require('../images/coin-litecoin-big.png'),
  },
  {
    id: 'ethereum',
    title: I18n.t('AddWallet.ethereumWallet'),
    image: require('../images/coin-ethereum-big.png'),
  },
  {
    id: 'nem',
    title: I18n.t('AddWallet.nemWallet'),
    image: require('../images/coin-nem-big.png'),
  },
]
