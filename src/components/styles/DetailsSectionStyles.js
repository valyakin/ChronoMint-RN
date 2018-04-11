/* @flow */

import {
  StyleSheet,
} from 'react-native'
// TODO: need to create global 'colors' module
import colors from 'utils/colors'

const styles = StyleSheet.create({
  walletImageShape: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  walletImageIcon: {
    width: 38,
    height: 38,
  },
  walletDetailsSection: {
    backgroundColor: '#302D59',
    borderRadius: 3,
    alignItems: 'center',
    padding: 24,
  },
  walletDetails: {
    color: '#A3A3CC',
  },
  address: {
    color: colors.background,
    fontSize: 11,
    fontWeight: '600',
    marginVertical: 16,
  },
  balance: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '700',
  },
})

export default styles
