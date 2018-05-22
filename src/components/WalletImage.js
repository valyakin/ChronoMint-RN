/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import {
  View,
  Image,
} from 'react-native'
import { indicators } from 'utils/globals'
import { type StyleObj as TStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import styles from 'components/styles/WalletImageStyles'
import { BLOCKCHAIN_ETHEREUM } from 'dao/EthereumDAO'
import {
  BLOCKCHAIN_BITCOIN_CASH,
  BLOCKCHAIN_BITCOIN_GOLD,
  BLOCKCHAIN_BITCOIN,
  BLOCKCHAIN_LITECOIN,
} from 'login/network/BitcoinProvider'
import { BLOCKCHAIN_NEM } from 'dao/NemDAO'

type WalletImageProps = {
  bcTitle: ?string,
  imageStyle?: TStyle,
  shapeStyle?: TStyle,
  style?: TStyle,
  walletMode?: '2fa' | 'shared' | 'timeLocked',
}

const walletImages = {
  [BLOCKCHAIN_ETHEREUM]: require('../images/coin-ethereum-small.png'),
  [BLOCKCHAIN_BITCOIN_CASH]: require('../images/coin-bitcoin-cash-small.png'),
  [BLOCKCHAIN_BITCOIN_GOLD]: require('../images/wallet-circle-small.png'),
  [BLOCKCHAIN_BITCOIN]: require('../images/coin-bitcoin-small.png'),
  [BLOCKCHAIN_LITECOIN]: require('../images/coin-litecoin-small.png'),
  [BLOCKCHAIN_NEM]: require('../images/coin-nem-small.png'),
}

const getFallbackWalletImage = (bcTitle: ?string) => {
  const bcsList = [
    BLOCKCHAIN_BITCOIN_CASH,
    BLOCKCHAIN_BITCOIN_GOLD,
    BLOCKCHAIN_BITCOIN,
    BLOCKCHAIN_ETHEREUM,
    BLOCKCHAIN_LITECOIN,
    BLOCKCHAIN_NEM,
  ]

  if (bcTitle && bcsList.includes(bcTitle)) {
    return walletImages[bcTitle]
  } else {
    return require('../images/wallet-circle-small.png')
  }
}

const WalletImage = ({
  bcTitle,
  walletMode,
  shapeStyle,
  imageStyle,
  style,
}: WalletImageProps) => {
  const wImage = getFallbackWalletImage(bcTitle)
  return (
    <View style={style}>
      {
        walletMode &&
          <Image
            source={indicators[walletMode]}
            style={styles.walletBadge}
          />
      }
      {
        (typeof bcTitle !== 'undefined') ?
          <Image source={wImage} /> :
          <View
            style={[
              styles.walletImageShape,
              shapeStyle,
            ]}
          >
            <Image
              source={wImage}
              style={[
                styles.walletImage,
                imageStyle,
              ]}
            />
          </View>
      }
    </View>
  )
}

export default WalletImage

