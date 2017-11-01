/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text } from '@components'
import styles from './styles'
import strings from './strings'

export const STATUS = {
  'FETCHING': 'FETCHING',
  'SYNCING': 'SYNCING',
  'SYNCED': 'SYNCED'
}

type FetchingIndicatorProps = {
  status: STATUS.FETCHING | STATUS.SYNCING | STATUS.SYNCED,
  style: number | Object
}

export class FetchingIndicator extends React.Component<FetchingIndicatorProps> {
  static propTypes = {
    status: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  }

  static defaultProps = {
    status: STATUS.FETCHING
  }

  render () {
    const { status, style } = this.props

    const bulletStyle = {
      [STATUS.FETCHING]: styles.bulletFetching,
      [STATUS.SYNCING]: styles.bulletSyncing,
      [STATUS.SYNCED]: styles.bulletSynced
    }[status]
    
    return (
      <View style={[styles.container, style]} >
        <View style={[styles.bullet, bulletStyle]} />
        <Text style={styles.label}>{strings[status]}</Text>
      </View>
    )
  }
}
