/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export default class AddEthereumWallet extends React.Component {
  
  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <Item {...item} navigator={this.props.navigator} />

  render () {
    return (
      <FlatList
        ItemSeparatorComponent={Separator}
        data={walletTypes}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={styles.screenView}
      />
    )
  }
}

class Item extends React.Component {
  handlePress = () => {
    this.props.navigator.push({
      screen: this.props.screen,
    })
  }

  render () {
    const { image, title, description } = this.props

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={this.handlePress}
      >
        { (typeof image !== 'undefined') && (
          <Image
            source={image}
            style={styles.itemImage}
          />
        )}
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
        <Image
          source={require('../images/chevron-right.png')}
          style={styles.itemChevron}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  screenView: {
    backgroundColor: colors.background,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  itemContent: {
    marginHorizontal: 20,
    flex: 1,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 13,
  },
  itemImage: {
    width: 32,
    height: 32,
  },
  itemChevron: {
    alignSelf: 'center',
  },
})

const walletTypes = [
  {
    id: 'standard',
    image: require('../images/wallet-circle.png'),
    title: 'Standard wallet',
    screen: 'AddStandardWallet',
  },
  {
    id: 'timeLocked',
    image: require('../images/type-time-locked-circle-small.png'),
    title: 'Time Locked',
    description: 'Make this wallet active for transactions on specific date and time.',
    screen: 'AddTimeLockedWallet',
  },
  {
    id: 'twoFA',
    image: require('../images/type-2fa-circle-small.png'),
    title: '2 Factor Authentucation',
    description: 'Protect your Wallet from unauthorized access by enabling two-factor authentication.',
    screen: 'Add2FAWallet',
  },
  {
    id: 'multisignature',
    title: 'Multi-Signature',
    image: require('../images/type-shared-circle-small.png'),
    description: 'Make the wallet controlled by multiple owners.',
    screen: 'AddMultiSignatureWallet',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    image: require('../images/type-advanced-circle-small.png'),
    description: 'Make the wallet with custom tokens.',
    screen: 'AddAdvancedWallet',
  },
]
