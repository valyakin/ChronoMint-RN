/* @flow */
import * as React from 'react'
import { FlatList, View, Image, Text, StyleSheet } from 'react-native'
import colors from '../utils/colors'
import images from '../assets/images'

export default class WalletTemplates extends React.Component {
  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <Template {...item} />

  render () {
    return (
      <FlatList
        data={templates}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.list}
      />
    )
  }
}

class Template extends React.Component {
  render () {
    const { image, symbol, value, title, address } = this.props
    return (
      <View style={styles.token}>
        { image && <Image source={image} style={styles.image} /> }
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text
            style={styles.address}
            ellipsizeMode='middle'
            numberOfLines={1}
          >
            {address}
          </Text>
        </View>
        <Text style={styles.value}>
          <Text>{symbol}</Text>
          &nbsp;
          <Text>{value}</Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  list: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  image: {
    width: 32,
    height: 32,
    margin: 8,
  },
  title: {
    fontWeight: '200',
  },
  content: {
    margin: 8,
    flex: 1,
  },
  address: {
    fontWeight: '200',
    color: '#7F7F7F',
  },
  value: {
    margin: 8,
    fontWeight: '200',
  },
  token: {
    backgroundColor: colors.background,
    margin: 8,
    padding: 8,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

const templates = [
  {
    id: '0',
    symbol: 'ETH',
    value: 0.1,
    title: 'Subscription payment',
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
    image: images.walletEthereum,
  },
]
