/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
} from 'react-native'
import { getWTokens } from 'redux/session/selectors'
import { mainTransfer } from 'redux/mainWallet/actions'
import AmountModel from 'models/Amount' // { default as AmountModel }
import BigNumber from 'bignumber.js'
import LabeledItem from 'components/LabeledItem'
import TokenModel from 'models/tokens/TokenModel'
import styles from './styles/ConfirmSendStyles'

type TTokenModel = typeof TokenModel
type TAmountModel = typeof AmountModel

type ConfirmSendProps = {
  tokensDuck: any, // TODO: to make a flow type for this
  navigator: any,
  recipientAddress: string,
  selectedCurrency: string,
  currentToken: string,
  feeMultiplier: number,
  amountToSend: {
    currency: number,
    token: number,
  },
  fee: {
    currency: number,
    token: number,
  },
  balance: {
    currency: number,
    token: number,
  },
  mainTransfer(
    token: TTokenModel,
    amount: TAmountModel,
    recipient: string,
    feeMultiplier: number,
  ): void,
}

const mapStateToProps = (state) => ({
  tokensDuck: getWTokens()(state),
})

const mapDispatchToProps  = (dispatch) => {
  return {
    mainTransfer: (
      token,
      amount,
      recipient,
      feeMultiplier: number,
    ) => dispatch(mainTransfer(token, amount, recipient, feeMultiplier)),
  }
}

class ConfirmSend extends React.PureComponent<ConfirmSendProps> {

  // noinspection JSUnusedGlobalSymbols
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel',
        id: 'cancel',
      },
    ],
    rightButtons: [
      {
        title: 'Confirm',
        id: 'confirm',
      },
   
    ],
  }

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  handleNavigatorEvent = ({ type, id }) => {
    if (type === 'NavBarButtonPress') {
      switch (id) {
        case 'cancel': {
          // Go back to previous screen (currently it is 'Send' screen only)
          this.props.navigator.pop()
          break
        }
        case 'confirm': {
          this.sendTransaction()
          this.props.navigator.pop()
          break
        }
      }
    }
  }

  sendTransaction = () => {
    const token = this.props.tokensDuck.item(this.props.currentToken)
    const toSendBigNumber: BigNumber = new BigNumber(this.props.amountToSend.token)
    const bnWithDecimals = token.addDecimals(toSendBigNumber)
    const amountToSend = new AmountModel(bnWithDecimals, this.props.currentToken)
    const recipient: string = this.props.recipientAddress
    const feeMultiplier = this.props.feeMultiplier
    this.props.mainTransfer(token, amountToSend, recipient, feeMultiplier)
  }

  render () {

    const {
      currentToken,
      selectedCurrency,
    } = this.props

    return (
      <View style={styles.container}>
        <LabeledItem
          labelText='Send To'
        >
          <Text>
            {
              this.props.recipientAddress
            }
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText={`${currentToken} ${this.props.amountToSend.token}`}
          labelType='currencyColored'
        >
          <Text style={styles.lightGreyText}>
            {
              `${selectedCurrency} ${this.props.amountToSend.currency.toFixed(2)}`
            }
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText='Fee'
        >
          <Text>
            {
              `${currentToken} ${this.props.fee.token}`
            }
            <Text style={styles.lightGreyText}>
              {
                ` (${selectedCurrency} ${this.props.fee.currency.toFixed(2)})`
              }
            </Text>
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText='Balance'
        >
          <Text>
            {
              `${currentToken}  ${this.props.balance.token}`
            }
            <Text style={styles.lightGreyText}>
              {
                ` (${selectedCurrency} ${this.props.balance.currency.toFixed(2)})`
              }
            </Text>
          </Text>
        </LabeledItem>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSend)
