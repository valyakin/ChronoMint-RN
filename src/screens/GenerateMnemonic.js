/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import I18n from 'react-native-i18n'
import PrimaryButton from '../components/PrimaryButton'

export default class GenerateMnemonic extends React.Component {
  handleConfirm = () => {
    this.props.navigator.push({
      screen: 'ConfirmMnemonic',
    })
  }

  renderWarningItem = (item, index) => (
    <WarningItem
      key={`warning${index}`}
      warning={index + 1}
    />
  )

  render () {
    return (
      <View>
        <Text style={styles.description}>
          {I18n.t('GenerateMnemonic.description')}
        </Text>
        <View style={styles.mnemonicContainer}>
          <Text style={styles.mnemonic}>
            {this.props.mnemonic}
          </Text>
        </View>
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>
            {I18n.t('GenerateMnemonic.warningTitle')}
          </Text>
          {new Array(2).fill(0).map(this.renderWarningItem)}
        </View>
        <PrimaryButton
          label={I18n.t('GenerateMnemonic.confirm').toUpperCase()}
          style={styles.primaryButton}
        />
      </View>
    )
  }
}

class WarningItem extends React.Component {
  render () {
    const { warning } = this.props

    return (
      <View style={styles.warningItem}>
        <Text style={styles.warningNumber}>{warning}.</Text>
        <Text style={styles.warningItemContent}>
          <Text style={styles.warningItemTitle}>
            {I18n.t(['GenerateMnemonic', 'warnings', warning, 'title'])}
          </Text>
          &nbsp;
          {I18n.t(['GenerateMnemonic', 'warnings', warning, 'content'])}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    color: '#A3A3CC',
    fontSize: 16,
    margin: 20,
  },
  warningContainer: {
    backgroundColor: '#302D59',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 3,
    paddingBottom: 30,
    borderTopColor: '#FFB54E',
    borderTopWidth: 5,
  },
  warningTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  warningItem: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  warningNumber: {
    marginRight: 5,
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  warningItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  warningItemContent: {
    color: '#A3A3CC',
    fontSize: 16,
    flex: 1,
  },
  mnemonicContainer: {
    backgroundColor: '#302D59',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  mnemonic: {
    color: '#FFB54E',
    fontSize: 16,
    fontWeight: '900',
    borderRadius: 3,
  },
  primaryButton: {
    marginHorizontal: 30,
  },
})
