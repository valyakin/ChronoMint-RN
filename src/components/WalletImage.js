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

type WalletImageProps = {
  image?: number,
  imageStyle?: any,
  shapeStyle?: any,
  style?: TStyle,
  walletMode?: '2fa' | 'shared' | 'timeLocked',
}

const WalletImage = ({ image, walletMode, shapeStyle, imageStyle, style }: WalletImageProps) => (
  <View style={style}>
    {
      walletMode &&
        <Image
          source={indicators[walletMode]}
          style={styles.walletBadge}
        />
    }
    {
      (typeof image !== 'undefined') ?
        <Image source={image} /> :
        <View
          style={[
            styles.walletImageShape,
            shapeStyle,
          ]}
        >
          <Image
            source={require('../images/wallet.png')}
            style={[
              styles.walletImage,
              imageStyle,
            ]}
          />
        </View>
    }
  </View>
)

export default WalletImage

