/* @flow */
import { StyleSheet } from 'react-native'
import { COLOR_BACKGROUND_LIGHT, UNIT } from '../../../constants/styles'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  bulletsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4 * UNIT
  },
  pinBullet: {
    marginHorizontal: UNIT,
    width: UNIT,
    height: UNIT,
    borderRadius: 0.5 * UNIT,
    backgroundColor: COLOR_BACKGROUND_LIGHT,
    opacity: .4
  },
  pinBulletActive: {
    opacity: 1
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2 * UNIT
  }
})
