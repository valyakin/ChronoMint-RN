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
  StyleSheet,
} from 'react-native'
import { indicators } from 'utils/globals'
import colors from 'utils/colors'

type WalletImageProps = {
  image?: number,
  walletMode?: '2fa' | 'shared' | 'timeLocked',
  shapeStyle?: any,
  imageStyle?: any,
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

const styles = StyleSheet.create({
  walletBadge: {
    position: 'absolute',
    zIndex: 1,
  },
  walletImageShape: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletImage: {
    tintColor: colors.background,
    width: 24,
    height: 24,
  },
})
