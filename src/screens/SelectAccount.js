/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import I18n from 'react-native-i18n'
import Separator from '../components/Separator'
import PrimaryButton from '../components/PrimaryButton'
import TextButton from '../components/TextButton'

export default class SelectAccount extends React.Component {
  handleImportAccount = () => {
    this.props.navigator.push({
      screen: 'ImportAccount',
      title: I18n.t('ImportAccount.title'),
    })
  }

  handleCreateWallet = () => {
    this.props.navigator.resetTo({ screen: 'CreateWallet' })
  }

  handleAccount = () => {
    this.props.navigator.push({
      screen: 'AccountPassword',
      title: 'AccountPassword.title',
    })
  }

  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => (
    <Item
      {...item}
      onPress={this.handleAccount}
    />
  )

  render () {
    return (
      <View>
        <FlatList
          data={addresses}
          style={styles.container}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={CustomizedSeparator}
          ListHeaderComponent={CustomizedSeparator}
          ListFooterComponent={CustomizedSeparator}
        />
        <PrimaryButton
          label={I18n.t('SelectAccount.importNew').toUpperCase()}
          onPress={this.handleImportAccount}
        />
        <Text style={styles.or}>
          {I18n.t('SelectAccount.or')}
        </Text>
        <TextButton
          label={I18n.t('SelectAccount.createNew')}
          onPress={this.handleCreateWallet}
        />
      </View>
    )
  }
}

class Item extends React.Component {
  render () {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={this.props.onPress}
      >
        <Image
          source={this.props.accountImage}
          style={styles.itemImage}
        />
        <Text style={styles.address}>
          {this.props.address}
        </Text>
        <Image
          source={require('../images/chevron-right.png')}
          style={styles.chevron}
        />
      </TouchableOpacity>
    )
  }
}

const CustomizedSeparator = () => (
  <Separator style={styles.separator} />
)

const addresses = []

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  or: {
    color: '#A3A3CC',
    alignSelf: 'center',
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#424066',
  },
  item: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  address: {
    flex: 1,
    color: '#A3A3CC',
    fontSize: 16,
    fontWeight: '700',
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 20,
    tintColor: 'rgba(255, 255, 255, 0.25)',
  },
})
