/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import Separator from './Separator'

const WalletAlertAction = ({ title, onPress, isMain }: WalletAlertActionProps) => (
  <TouchableOpacity
    style={styles.action}
    onPress={onPress || (() => {})}
  >
    <Text style={[ styles.actionTitle, (isMain && styles.actionTitleMain) ]}>
      {title}
    </Text>
  </TouchableOpacity>
)

export default class WalletAlert extends React.Component<WalletAlertProps> {

  renderActionButton = (item, index, actions) => ([
    <WalletAlertAction {...item} key={item.id} />,
    (index < actions.length - 1) && <Separator key={index} />,
  ])
  
  render () {
    const { actions, title, children, style, contentContainerStyle } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Separator />
        <View style={[ styles.content, contentContainerStyle ]}>
          {children}
        </View>
        <Separator />
        <View style={styles.actions}>
          {actions && actions.map(this.renderActionButton)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 3,
  },
  title: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  content: {
    padding: 24,
    paddingBottom: 16, 
  },
  action: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  actionTitle: {
    textAlign: 'center',
    color: colors.primaryLight,
    fontWeight: '200',
    fontSize: 16,
  },
  actionTitleMain: {
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
  },
})

type WalletAlertProps = {
  actions: WalletAlertActionProps[],
  children?: React.Node,
  contentContainerStyle: any,
  style: any,
  title: string,
}

type WalletAlertActionProps = {
  isMain?: boolean,
  title: string,
  onPress?: () => void,
}
