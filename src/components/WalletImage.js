/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import {
  View,
  Image
} from 'react-native'
import { indicators } from 'utils/globals'
import { type StyleObj as TStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import styles from 'components/styles/WalletImageStyles'
import { BLOCKCHAIN_ETHEREUM } from 'dao/EthereumDAO'
import {
  BLOCKCHAIN_BITCOIN_CASH,
  BLOCKCHAIN_BITCOIN_GOLD,
  BLOCKCHAIN_BITCOIN,
  BLOCKCHAIN_LITECOIN
} from 'login/network/BitcoinProvider'
// import { BLOCKCHAIN_NEM } from 'dao/NemDAO'
const BLOCKCHAIN_NEM = 'NEM' // TODO: replace it to import above after ChronoMint depency upgrade

export type TWalletMode = '2fa' | 'shared' | 'timeLocked'

type WalletImageProps = {
  blockchain: string,
  imageStyle?: TStyle,
  shapeStyle?: TStyle,
  size?: 'big' | 'small',
  style?: TStyle,
  walletMode?: ?TWalletMode,
}

const walletImages = {
  [BLOCKCHAIN_ETHEREUM]: require('../images/coin-ethereum-small.png'),
  [BLOCKCHAIN_BITCOIN_CASH]: require('../images/coin-bitcoin-cash-small.png'),
  [BLOCKCHAIN_BITCOIN_GOLD]: require('../images/wallet-circle-small.png'),
  [BLOCKCHAIN_BITCOIN]: require('../images/coin-bitcoin-small.png'),
  [BLOCKCHAIN_LITECOIN]: require('../images/coin-litecoin-small.png'),
  [BLOCKCHAIN_NEM]: require('../images/coin-nem-small.png')
}

const walletBigImages = {
  [BLOCKCHAIN_ETHEREUM]: require('../images/coin-ethereum-big.png'),
  [BLOCKCHAIN_BITCOIN_CASH]: require('../images/coin-bitcoin-cash-big.png'),
  [BLOCKCHAIN_BITCOIN_GOLD]: require('../images/wallet-circle-big.png'),
  [BLOCKCHAIN_BITCOIN]: require('../images/coin-bitcoin-big.png'),
  [BLOCKCHAIN_LITECOIN]: require('../images/coin-litecoin-big.png'),
  [BLOCKCHAIN_NEM]: require('../images/coin-nem-big.png')
}

const getFallbackWalletImage = (blockchain: ?string, size: string = 'small') => {
  const bcsList = [
    BLOCKCHAIN_BITCOIN_CASH,
    BLOCKCHAIN_BITCOIN_GOLD,
    BLOCKCHAIN_BITCOIN,
    BLOCKCHAIN_ETHEREUM,
    BLOCKCHAIN_LITECOIN,
    BLOCKCHAIN_NEM
  ]

  if (blockchain && bcsList.includes(blockchain)) {
    return size === 'big'
      ? walletBigImages[blockchain]
      : walletImages[blockchain]
  } else {
    return size === 'big'
      ? require('../images/wallet-circle-big.png')
      : require('../images/wallet-circle-small.png')
  }
}

const WalletImage = ({
  blockchain,
  walletMode,
  shapeStyle,
  imageStyle,
  style,
  size
}: WalletImageProps) => {
  // Size guard. Default is small wallet icon
  let imageSize = 'small'
  if (size) {
    imageSize = size
  }
  const wImage = getFallbackWalletImage(blockchain, imageSize)

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
        (typeof blockchain !== 'undefined')
          ? <Image source={wImage} />
          : <View
            style={[
              styles.walletImageShape,
              shapeStyle
            ]}
          >
            <Image
              source={wImage}
              style={[
                styles.walletImage,
                imageStyle
              ]}
            />
          </View>
      }
    </View>
  )
}

export default WalletImage
