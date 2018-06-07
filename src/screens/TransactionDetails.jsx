/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Text,
  View,
} from 'react-native'
import LabeledItem from 'components/LabeledItem'
import styles from 'screens/styles/TransactionDetailsStyles'
import TransactionIcon, { type TTransactionType, type TIconMode } from 'components/TransactionIcon'

type TTransactionDetailsProps = {
  address: string,
  amount: number,
  blockchain: string,
  confirmations: number,
  fee: number,
  transactionType: TTransactionType,
  selectedCurrency: string,
  currencyPrice: number,
}

export default class TransactionDetails extends PureComponent<TTransactionDetailsProps, {}> {
  render () {
    const {
      address,
      amount,
      blockchain,
      confirmations,
      currencyPrice,
      fee,
      selectedCurrency,
      transactionType,
    } = this.props

    const iconMode: TIconMode = 'big'

    const Estimation = (confirmations, blockchain) => {
      /*Ivan Abdulov [15:13]
        btc/ltc/bcc/btg - ~10m per 1 confirm
        eth/erc20 - ~30s per 1 confirm */

    }

    return (
      <View style={styles.container}>
        <LabeledItem
          labelText='Send To'
        >
          <Text>
            {
              recipientAddress
            }
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText={`${currentToken} ${amountToSend.token}`}
          labelType='currencyColored'
        >
          <Text style={styles.lightGreyText}>
            {
              `${selectedCurrency} ${amountToSend.currency.toFixed(2)}`
            }
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText='Fee'
        >
          <Text>
            {
              `${currentToken} ${fee.token}`
            }
            <Text style={styles.lightGreyText}>
              {
                ` (${selectedCurrency} ${fee.currency.toFixed(2)})`
              }
            </Text>
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText='Balance'
        >
          <Text>
            {
              `${currentToken}  ${balance.token}`
            }
            <Text style={styles.lightGreyText}>
              {
                ` (${selectedCurrency} ${balance.currency.toFixed(2)})`
              }
            </Text>
          </Text>
        </LabeledItem>
      </View>
    )
  }
}
