/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { FlatList, View, Image, Text, StyleSheet } from 'react-native'
import colors from '../utils/colors'

export type TOwner = {
  address: string,
  id: string,
  image: string,
  name: string,
}

type TWalletOwnersProps = {
  owners: Array<TOwner>,
  onSelectOwner: (owner: TOwner) => () => void,
}

type TOwnerProps = TOwner & {
  onSelectOwner: () => void,
}

export default class WalletOwners extends PureComponent<TWalletOwnersProps, {}> {
  keyExtractor = ({ id }: TOwner) => id

  renderItem = ({ item }: { item: TOwner }) =>
    (<Owner
      {...item}
      onSelectOwner={this.props.onSelectOwner(item)}
    />)

  render () {
    const {
      owners,
    } = this.props

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

class Owner extends PureComponent<TOwnerProps, {}> {
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
  address: {
    color: '#7F7F7F',
    fontSize: 12,
    fontWeight: '200',
  },
  image: {
    height: 32,
    margin: 8,
    width: 32,
  },
  list: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
  },
  owner: {
    backgroundColor: colors.background,
    borderRadius: 3,
    flexDirection: 'row',
    margin: 8,
    padding: 8,
  },
  ownerContent: {
    flex: 1,
    margin: 8,
  },
})
