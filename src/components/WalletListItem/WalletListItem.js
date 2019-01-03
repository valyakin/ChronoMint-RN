/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  indicator_receiving_0,
  clipboard,
} from '../../images'
import PrimaryToken from '../PrimaryToken'
import PrimaryBalance from '../PrimaryBalance'
import TokensCounter from '../TokensCounter'
import WalletImage from '../WalletImage'
import styles from './WalletListItemStyles'

const Transactions = ({ transactions }) => !transactions ? null : (
  !transactions[1] ?
    (
      <Image
        source={indicator_receiving_0}
      />
    ) :
    (
      <View style={styles.transactionsNumberContainer}>
        <Text style={styles.transactionsNumber}>
          {transactions.length}
        </Text>
      </View>
    )
)

export default class WalletListItem extends PureComponent {

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
      onItemPress = () => { },
      onCopyAddress = () => { },
      wallet,
    } = this.props

    const primaryToken = wallet.tokens[Object.keys(wallet.tokens)[0]]

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onItemPress}
      >
        <View>
          <View style={styles.transactions}>
            <Transactions transactions={[1]} />
          </View>
          <View style={styles.content}>
            <WalletImage
              blockchain={blockchain}
              style={styles.image}
            />
            <View style={styles.contentColumn}>
              <View style={styles.walletLine}>
                <Text style={styles.title}>
                  {
                    `My ${blockchain} Wallet`
                  }
                </Text>
                <TouchableOpacity
                  onPress={onCopyAddress}
                  style={styles.copyAddress}>
                  <Image
                    source={clipboard}
                    style={styles.copyImage}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={styles.address}
                ellipsizeMode='middle'
                numberOfLines={1}
              >
                {
                  address
                }
              </Text>
              <PrimaryToken
                token={primaryToken}
              />
              <View style={styles.balanceAndTokensRow}>
                <PrimaryBalance
                  blockchain={blockchain}
                  selectedCurrency={selectedCurrency}
                  wallet={wallet}
                />
                <TokensCounter
                  blockchain={blockchain}
                  wallet={wallet}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

WalletListItem.propTypes = {
  wallet: PropTypes.shape({}),
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  onItemPress: PropTypes.func,
  onCopyAddress: PropTypes.func,
}
