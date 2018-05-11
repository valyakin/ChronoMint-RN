/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { type Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getWTokens } from 'redux/session/selectors'
import { mainTransfer } from 'redux/mainWallet/actions'
import AmountModel from 'models/Amount' // { default as AmountModel }
import BigNumber from 'bignumber.js'
import TokenModel from 'models/tokens/TokenModel'
import ConfirmSend from '../screens/ConfirmSend'

type TTokenModel = typeof TokenModel
type TAmountModel = typeof AmountModel

export type TConfirmSendContainerProps = {
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
  mainTransfer: (
    token: TTokenModel,
    amount: TAmountModel,
    recipient: string,
    feeMultiplier: number,
  ) => void,
}

class ConfirmSendContainer extends PureComponent<TConfirmSendContainerProps, {}> {
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

  constructor (props: TConfirmSendContainerProps) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  handleNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
    if (type === 'NavBarButtonPress') {
      switch (id) {
        case 'cancel': {
          // Go back to previous screen
          this.props.navigator.pop()
          break
        }
        // Close confirm screen, reset Send screen, go to Wallet screren (TODO: select transactions tab)
        case 'confirm': {
          this.sendTransaction()
          this.props.navigator.resetTo('Wallet')
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
    return (
      <ConfirmSend
        amountToSend={this.props.amountToSend}
        balance={this.props.balance}
        currentToken={this.props.currentToken}
        fee={this.props.fee}
        recipientAddress={this.props.recipientAddress}
        selectedCurrency={this.props.selectedCurrency}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  tokensDuck: getWTokens()(state),
})

const mapDispatchToProps  = (dispatch: Dispatch<any>) => {
  return {
    mainTransfer: (
      token,
      amount,
      recipient,
      feeMultiplier: number,
    ) => dispatch(mainTransfer(token, amount, recipient, feeMultiplier)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSendContainer)
