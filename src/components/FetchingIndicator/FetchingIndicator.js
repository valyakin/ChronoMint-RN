// @flow
import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import strings from './strings'
import Text from '../Text'

type FetchingStatus = 'FETCHING' | 'SYNCING' | 'SYNCED'

export const STATUS = {
  'FETCHING': 'FETCHING',
  'SYNCING': 'SYNCING',
  'SYNCED': 'SYNCED',
}

type FetchingIndicatorProps = {
  status?: FetchingStatus,
  style?: number | Object
}

const FetchingIndicator = (props: FetchingIndicatorProps) => {
  const { status, style } = props

  const bulletStyle = {
    [STATUS.FETCHING]: styles.bulletFetching,
    [STATUS.SYNCING]: styles.bulletSyncing,
    [STATUS.SYNCED]: styles.bulletSynced,
  }[status]
  
  return (
    <View style={[styles.container, style]} >
      <View style={[styles.bullet, bulletStyle]} />
      <Text style={styles.label}>{strings[status]}</Text>
    </View>
  )
}

FetchingIndicator.defaultProps = {
  status: STATUS.FETCHING,
}

export default FetchingIndicator
