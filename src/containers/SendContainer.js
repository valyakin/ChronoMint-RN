/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import type { Map } from 'immutable'
import { Alert } from 'react-native'
import { BigNumber } from 'bignumber.js'
import {
  getGasPriceMultiplier,
  getWTokens,
} from 'redux/session/selectors'
import {
  makeGetWalletTokensAndBalanceByAddress,
  selectMarketPricesSelectedCurrencyStore,
} from 'redux/wallet/selectors'
import {
  ETH,
} from 'redux/mainWallet/actions'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import * as EthereumDAO from 'dao/EthereumDAO'
import AmountModel from 'models/Amount' // { default as AmountModel }
import tokenService from 'services/TokenService'
import Web3Converter from 'utils/Web3Converter'
import Send, {
  type TAmBa,
  type TCalculatedTokenCollection,
  type TCalculatedTokenData,
  type TPrices,
  type TSelectedToken,
  type TTokenModel,
  type TTokensCollectionModel,
  type TWalletTokensAndBalanceByAddress,
} from '../screens/Send'

type TSendContainerProps = {
  address: string,
  blockchain: string,
  gasPriceMultiplier: number,
  navigator: any, // TODO: to implement a flow type for navigator
  prices: ?TPrices,
  selectedBlockchainName: string,
  selectedCurrency: string,
  token: TTokenModel,
  tokens: TCalculatedTokenCollection,
  tokensDuck: TTokensCollectionModel,
  walletTokensAndBalance: TWalletTokensAndBalanceByAddress,
}

type TSendState = {
  amount: ?number,
  amountInCurrency: number,
  feeMultiplier: number,
  gasFee: ?BigNumber,
  gasFeeAmount: ?number,
  gasFeeAmountInCurrency: ?number,
  isAmountInputValid: boolean,
  isRecipientInputValid: boolean,
  recipient: string,
  selectedDAO: ?EthereumDAO, // TODO: to describe type of a Dao.
  selectedToken: ?TSelectedToken,
}

const makeMapStateToProps = (origState: Map, origProps: TSendContainerProps) => {
  const token: TTokenModel = origState.get(DUCK_TOKENS).item(ETH) // TODO: replace hardcode
  const getWalletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress(origProps.blockchain)

  const mapStateToProps = (state, ownProps) => {
    const walletTokensAndBalance: TWalletTokensAndBalanceByAddress = getWalletTokensAndBalanceByAddress(state, ownProps)
    return {
      gasPriceMultiplier: getGasPriceMultiplier(token.blockchain())(state),
      selectedCurrency: selectMarketPricesSelectedCurrencyStore(state),
      token,
      tokensDuck: getWTokens()(state),
      walletTokensAndBalance,
    }
  }

  return mapStateToProps
}

class SendContainer extends React.PureComponent<TSendContainerProps, TSendState> {

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
        title: 'Done',
        id: 'done',
      },
   
    ],
  }

  static getDerivedStateFromProps (nextProps: TSendContainerProps, prevState: TSendState) {
    if (!prevState.selectedToken &&
      nextProps.walletTokensAndBalance &&
      nextProps.walletTokensAndBalance.tokens) {

      // [AO] See https://github.com/facebook/flow/issues/2221
      const flowTypableValuesExtractor = <T>(obj: { [string]: T }): Array<T> =>
        Object.keys(obj).map((k) => obj[k])

      const firstTokenInRow: TCalculatedTokenData = nextProps.walletTokensAndBalance.tokens[0]
      const dataAmountBalance: TAmBa = flowTypableValuesExtractor(firstTokenInRow)[0]
      return {
        selectedToken: {
          amount: dataAmountBalance.amount,
          symbol: Object.keys(firstTokenInRow),
        },
      }
    }
    // Return null to indicate no change to state.
    return null
  }

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  state = {
    amount: null,
    amountInCurrency: 0,
    feeMultiplier: 1,
    gasFee: null,
    isAmountInputValid: false,
    isRecipientInputValid: false,
    recipient: '',
    selectedDAO: null,
    selectedToken: null,
    gasFeeAmount: null,
    gasFeeAmountInCurrency: null,
  }

  handleGotoConfirmScreen = (selectedTokenSymbol, amount, balance) => {
    if (this.state.isRecipientInputValid && this.state.isAmountInputValid) {
      this.props.navigator.push({
        screen: 'ConfirmSend',
        title: 'Confirm Send',
        passProps: {
          recipientAddress: this.state.recipient,
          selectedCurrency: this.props.selectedCurrency,
          currentToken: selectedTokenSymbol,
          amountToSend: {
            token: this.state.amount,
            currency: this.state.amountInCurrency,
          },
          fee: {
            token: this.state.gasFeeAmount,
            currency: this.state.gasFeeAmountInCurrency,
          },
          balance: {
            token: amount,
            currency: balance,
          },
        },
      })
    } else {
      Alert.alert('Input errro', 'Please fill address and amount', [{ text: 'Ok', onPress: () => {}, style: 'cancel' }])
    } 
  } 

  handleNavigatorEvent = ({ type, id }) => {
    if (type === 'NavBarButtonPress') {
      const selectedTokenSymbol: string | null = this.state.selectedToken &&
        this.state.selectedToken.symbol ||
        null

      const CT = this.props.walletTokensAndBalance && 
        selectedTokenSymbol &&
        this.props.walletTokensAndBalance.tokens
          .find( (tObj) => {
            return Object.keys(tObj)[0] === selectedTokenSymbol
          })

      const { balance, amount } = (CT && selectedTokenSymbol)
        ? CT[this.state.selectedToken.symbol]
        : { balance: null, amount: null }

      switch (id) {
        case 'cancel': {
          this.props.navigator.pop()
          break
        }
        case 'done': {
          this.handleGotoConfirmScreen(selectedTokenSymbol, amount, balance)
        }
      }
    }
  }

  // handleSubmitSuccess = () => {
  //   this.props.navigator.pop()
  // }

  handleChangeRecipient = (value: string) => {
    const dummyValidationOfRecipientInput: boolean = (value !== null && value !== '' && (value.length >= 40 || value.length <= 44) && value.startsWith('0x') )
    this.setState({
      recipient: value,
      isRecipientInputValid: dummyValidationOfRecipientInput,
    }, () => {
      if (this.state.isAmountInputValid) {
        this.requestGasEstimations(this.state.recipient, this.state.amount)
      }
    })
  }

  handleChangeAmount = (value: string) => {
    if (!(value.endsWith(',') || value.endsWith('.'))) {
      // console.log(value, I18n.toNumber(value, { precision: 0 }))
      const localeValue = parseFloat(value.replace(',', '.').replace(' ', ''))
      const tokenPrice = this.props.prices &&
        this.state.selectedToken &&
        this.props.prices[ this.state.selectedToken.symbol ] &&
        this.props.prices[ this.state.selectedToken.symbol ][ this.props.selectedCurrency ] || 0 // TODO: handle wrong values correctly
  
      const dummyValidationOfAmountInput: boolean =  (localeValue !== null && localeValue !== undefined && localeValue !== '' && localeValue > 0)
      this.setState({
        amount: localeValue,
        amountInCurrency: tokenPrice * localeValue,
        isAmountInputValid: dummyValidationOfAmountInput,
      }, () => {
        if (this.state.isRecipientInputValid) {
          this.requestGasEstimations(this.state.recipient, this.state.amount)
        }
      })
    } else {
      this.setState({
        amount: parseFloat(value.replace(',', '.').replace(' ', '')),
        amountInCurrency: 0,
        isAmountInputValid: false,
      })
    }
  }

  handleSelectToken = (): void => {
    this.props.navigator.push({
      screen: 'SelectToken',
      title: 'Select Token',
      passProps: {
        tokens: this.props.tokens,
        onPressAction: (data) => {
          this.setState({
            selectedToken: {
              symbol: data.symbol,
              amount: data.amount,
            },
            selectedDAO: tokenService.getDAO( this.props.tokensDuck.getBySymbol(data.symbol)) || null,
          })
        },
      },
    })
  }
  
  handleFeeSliderChange = (value: number) => {
    if (this.state.gasFee !== null) {
      const newGasFee =this.state.gasFee &&
        this.state.selectedDAO &&
        (new AmountModel(this.state.selectedDAO.removeDecimals(this.state.gasFee.mul(this.state.feeMultiplier)))).toNumber()
      const tokenPrice = this.props.prices &&
        this.state.selectedToken &&
        this.props.prices[ this.state.selectedToken.symbol ][ this.props.selectedCurrency ] || 0 // TODO: handle wrong values correctly
      const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null
      this.setState({
        feeMultiplier: value,
        gasFeeAmount: newGasFee,
        gasFeeAmountInCurrency: newGasFeePrice,
      })
    } else {
      this.setState({
        feeMultiplier: value,
      })
    }
  }

  requestGasEstimations = (to, value) => {
    console.log('\n\n\n\n\nREQUIESTING GAS ESTIMATION\n\n\n\n\n')
    console.log(to, value)
    console.log('\n\n\n\n\nREQUIESTING GAS ESTIMATION\n\n\n\n\n')
    // n: BigNumber, unit: string = 'wei'): BigNumber
    const weiValue = Web3Converter.toWei(new BigNumber(value))
    if (this.state.selectedToken) {
      this.state.selectedDAO &&
        // eslint-disable-next-line no-underscore-dangle
        this.state.selectedDAO._estimateGas &&
        // eslint-disable-next-line no-underscore-dangle
        this.state.selectedDAO._estimateGas(to, weiValue)
          .then( ({ gasFee }: { gasFee: BigNumber }) => {
            console.log('Received gasFee:', gasFee)
            const newGasFee = this.state.selectedDAO &&
              (new AmountModel(this.state.selectedDAO.removeDecimals(gasFee.mul(this.state.feeMultiplier)))).toNumber()
            console.log('New gas Fee:', newGasFee)
            const tokenPrice = this.props.prices &&
              this.state.selectedToken &&
              this.state.selectedToken.symbol &&
              this.props.prices[ this.state.selectedToken.symbol ][ this.props.selectedCurrency ] || 0 // TODO: handle wrong values correctly
            const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null
            console.log('New gas price:', newGasFeePrice)

            this.setState({
              gasFee,
              gasFeeAmount: newGasFee,
              gasFeeAmountInCurrency: newGasFeePrice,
            })
          })
          .catch( (error) => {
            if (error) {
              // eslint-disable-next-line no-console
              console.log('Error during fetching gasPrice. No info how to handle it.', error)
            }
          })
    }
  }

  render () {
    const {
      walletTokensAndBalance,
    } = this.props
    const { 
      selectedToken,
    } = this.state

    const selectedTokenSymbol: ?string = selectedToken && selectedToken.symbol || null

    const CT = walletTokensAndBalance && selectedTokenSymbol &&
      walletTokensAndBalance.tokens.find((tObj) =>
        Object.keys(tObj)[0] === selectedTokenSymbol
      )
    return (
      <Send
        address={this.props.address}
        amount={this.state.amount}
        amountInCurrency={this.state.amountInCurrency}
        currentTokenBalance={(CT && selectedTokenSymbol) ? CT[selectedTokenSymbol].balance : null}
        feeMultiplier={this.state.feeMultiplier}
        gasFeeAmount={this.state.gasFeeAmount}
        gasFeeAmountInCurrency={this.state.gasFeeAmountInCurrency}
        onChangeAmount={this.handleChangeAmount}
        onChangeRecipient={this.handleChangeRecipient}
        onFeeSliderChange={this.handleFeeSliderChange}
        onSelectToken={this.handleSelectToken}
        recipient={this.state.recipient}
        selectedBlockchainName={this.props.selectedBlockchainName}
        selectedCurrency={this.props.selectedCurrency}
        selectedToken={selectedToken}
        selectedTokenSymbol={selectedTokenSymbol}
      />
    )
  }
}

export default connect(makeMapStateToProps)(SendContainer)
