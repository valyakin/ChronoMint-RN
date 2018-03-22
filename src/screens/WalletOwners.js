/* @flow */
import * as React from 'react'
import { FlatList, View, Image, Text, StyleSheet } from 'react-native'
import colors from '../utils/colors'
import images from '../assets/images'

export default class WalletOwners extends React.Component {
  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <Owner {...item} />

  render () {
    return (
      <FlatList
        data={owners}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.list}
      />
    )
  }
}

class Owner extends React.Component {
  render () {
    const { image, name, address } = this.props
    return (
      <View style={styles.owner}>
        { image && <Image source={image} style={styles.image} /> }
        <View style={styles.ownerContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  image: {
    width: 32,
    height: 32,
    margin: 8,
  },
  ownerContent: {
    margin: 8,
    flex: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 12,
  },
  address: {
    fontWeight: '200',
    fontSize: 12,
    color: '#7F7F7F',
  },
  owner: {
    backgroundColor: colors.background,
    margin: 8,
    padding: 8,
    borderRadius: 3,
    flexDirection: 'row',
  },
})

const owners = [
  {
    id: '0',
    image: images.profile,
    name: 'You',
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
  },
  {
    id: '1',
    image: images.profile,
    name: 'Owner name',
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
  },
]
