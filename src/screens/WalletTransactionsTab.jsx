/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  ScrollView,
} from 'react-native'
import DetailsSection, { type TDetailSection } from 'components/DetailsSection'
import styles from 'screens/styles/WalletTransactionsStyles'
import TransactionsListContainer from 'containers/TransactionsListContainer'

export type TWalletTransactionsProps = {
  address: string,
  balance: any,
  blockchain: string,
  tokensLength: number,
}

export default class WalletTransactions extends PureComponent<TWalletTransactionsProps> {

  render () {
    const {
      address,
      balance,
      blockchain,
      tokensLength,
    } = this.props

    const dataForDetailSection: TDetailSection = {
      address,
      balance,
      blockchain,
      tokensLength,
    }

    return (
      <ScrollView style={styles.mainSection}>
        <DetailsSection
          {...dataForDetailSection}
        />
        <TransactionsListContainer />
      </ScrollView>
    )
  }
}
