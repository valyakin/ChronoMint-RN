/* @flow */
import * as React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { badges } from '../utils/globals'
import colors from '../utils/colors'
import images from '../assets/images'

const WalletImage = ({ image, walletMode, shapeStyle, imageStyle, style }: WalletImageProps) => (
  <View style={style}>
    { walletMode && <Image source={badges[walletMode]} style={styles.walletBadge} /> }
    { (typeof image !== 'undefined') ?
      <Image source={image} /> :
      <View style={[
        styles.walletImageShape,
        shapeStyle,
      ]}
      >
        <Image
          source={images.wallet}
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

type WalletImageProps = {
  image?: number,
  walletMode?: '2fa' | 'shared' | 'timeLocked',
  shapeStyle?: any,
  imageStyle?: any,
}
