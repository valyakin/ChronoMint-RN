/* @flow */

import * as React from 'react'
import {
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'

import WalletImage from './WalletImage'

import styles from './styles/DetailsSectionStyles'

const DetailsSection = (
  {
    mode,
    address,
    balance,
    tokensLength,
  }
) => (
  <View style={styles.walletDetailsSection}>
    <WalletImage
      walletMode={mode}
      shapeStyle={styles.walletImageShape}
      imageStyle={styles.walletImageIcon}
    />
    <Text style={styles.address}>
      {
        address
      }
    </Text>
    <Text style={styles.balance}>
      USD&nbsp;
      {I18n.toNumber(balance, { precision: 2 })}
    </Text>
    <Text style={styles.walletDetails}>
      {tokensLength} Tokens
    </Text>
  </View>
)

export default DetailsSection
