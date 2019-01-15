/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import QRCode from 'react-native-qrcode'
import { BTC_PRIMARY_TOKEN } from '@chronobank/bitcoin/constants'
import { ETH_PRIMARY_TOKEN, BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import PropTypes from 'prop-types'
import {
  clipboard,
} from '../../../images'
import Separator from '../../../components/Separator'
import WalletImage from '../../../components/WalletImage'
import styles from './ReceiveStyles'

export default class Receive extends PureComponent {

  static propTypes = {
    blockchain: PropTypes.string,
    currentWallet: PropTypes.shape({
      address: PropTypes.string,
    }),
    onCopyAddress: PropTypes.func,
  }

  render () {
    const {
      blockchain,
      currentWallet,
      onCopyAddress,
    } = this.props
    const { address } = currentWallet

    const token = blockchain === BLOCKCHAIN_ETHEREUM
      ? ETH_PRIMARY_TOKEN
      : BTC_PRIMARY_TOKEN

    return (
      <ScrollView
        style={styles.screenView}
      >
        <View style={styles.section}>
          <WalletImage
            blockchain={blockchain}
            style={styles.image}
            size='big'
          />
          <View style={styles.warning}>
            <Text style={styles.headerText}>Important!</Text>
            <View style={styles.warningText}>
              <Text style={styles.text}>Make sure you are receiving <Text style={styles.bold}>{token}</Text> to the address provided below. Otherwise it can make the funds loss.</Text>
            </View>
          </View>
        </View>
        <Separator />
        <View style={styles.section}>
          <View>
            <Text style={styles.headerText}>Give the address to receive funds</Text>
            <Text>{address}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onCopyAddress(address)}
          >
            <Image
              source={clipboard}
              style={styles.copyImage}
            />
          </TouchableOpacity>
        </View>
        <Separator />
        <View style={styles.section}>
          <Text style={styles.headerText}>Or use QR code</Text>
          <TouchableOpacity
            onPress={() => onCopyAddress(address)}
          >
            <Image
              source={clipboard}
              style={styles.copyImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.qrSection}>
          <QRCode
            value={address}
            size={250}
            bgColor='black'
            fgColor='white'
          />
        </View>
      </ScrollView>
    )
  }
}
