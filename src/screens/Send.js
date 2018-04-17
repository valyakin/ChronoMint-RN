/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import type { Map } from 'immutable'
import BigNumber from 'bignumber.js'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
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
import colors from 'utils/colors'
import FeeSlider from 'components/FeeSlider'
import SectionHeader from 'components/SectionHeader'
import Separator from 'components/Separator'
import TokenModel from 'models/tokens/TokenModel'
import TokensCollection from 'models/tokens/TokensCollection'
import tokenService from 'services/TokenService'

type TBigNumber = typeof BigNumber
type TTokenModel = typeof TokenModel
type TTokensCollectionModel = typeof TokensCollection
type TAmBa = {
  amount: number,
  balance: number,
}
type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}
type TCalculatedToken = TPrices
type TCalculatedTokenCollection = TCalculatedToken[]
type TCalculatedTokenData = {
  [token: string]: TAmBa,
}
type TWalletTokensAndBalanceByAddress = {
  balance: number,
  tokens: TCalculatedTokenData[]
}
type TSelectedToken = {
  symbol: string,
  amount: number,
}
interface ISendProps {
  address: string,
  blockchainTitle: string,
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
  gasFee: ?TBigNumber,
  gasFeeAmount: ?number,
  gasFeeAmountInCurrency: ?number,
  isAmountInputValid: boolean,
  isRecipientInputValid: boolean,
  recipient: string,
  selectedDAO: ?EthereumDAO, // TODO: to describe type of a Dao.
  selectedToken: ?TSelectedToken,
}

const makeMapStateToProps = (origState: Map, origProps: ISendProps) => {
  const token: TTokenModel = origState.get(DUCK_TOKENS).item(ETH) // TODO: replace hardcode
  const getWalletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress(origProps.blockchainTitle)
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

class Send extends React.PureComponent<ISendProps, TSendState> {

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

  static getDerivedStateFromProps (nextProps: ISendProps, prevState: TSendState) {
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

      const { balance, amount } = (CT && selectedTokenSymbol) ? CT[this.state.selectedToken.symbol] : {balance: null, amount: null}
      switch (id) {
        case 'cancel': {
          this.props.navigator.pop()
          break
        }
        case 'done': {
          this.props.navigator.push({
            screen: 'ConfirmSend',
            title: 'Confirm Send',
            passProps: {
              recipientAddress: this.state.recipient,
              selectedCurrency: this.props.selectedCurrency,
              currentToken: this.state.selectedToken.symbol,
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
        }
      }
    }
  }

  handleSubmitSuccess = () => {
    this.props.navigator.pop()
  }

  handleRecipientInput = (value: string) => {
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

  handleAmountInput = (value: number) => {
    const tokenPrice = this.props.prices &&
      this.state.selectedToken &&
      this.props.prices[ this.state.selectedToken.symbol ] &&
      this.props.prices[ this.state.selectedToken.symbol ][ this.props.selectedCurrency ] || 0 // TODO: handle wrong values correctly
 
    const dummyValidationOfAmountInput: boolean =  (value !== null && value !== undefined && value !== '' && value > 0)
    this.setState({
      amount: value,
      amountInCurrency: tokenPrice * value,
      isAmountInputValid: dummyValidationOfAmountInput,
    }, () => {
      if (this.state.isRecipientInputValid) {
        this.requestGasEstimations(this.state.recipient, this.state.amount)
      }
    })
  }

  handlePressOnTokenSelector = (): void => {
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

  requestGasEstimations = (to, value) => {
    if (this.state.selectedToken) {
      this.state.selectedDAO &&
        // eslint-disable-next-line no-underscore-dangle
        this.state.selectedDAO._estimateGas &&
        // eslint-disable-next-line no-underscore-dangle
        this.state.selectedDAO._estimateGas(to, value)
          .then( ({ gasFee }: { gasFee: TBigNumber }) => {
            const newGasFee = this.state.selectedDAO &&
              (new AmountModel(this.state.selectedDAO.removeDecimals(gasFee.mul(this.state.feeMultiplier)))).toNumber()
            const tokenPrice = this.props.prices &&
              this.state.selectedToken &&
              this.state.selectedToken.symbol &&
              this.props.prices[ this.state.selectedToken.symbol ][ this.props.selectedCurrency ] || 0 // TODO: handle wrong values correctly
            const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null

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

  onFeeSliderChange = (value: number) => {
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

  // Temporary 
  // eslint-disable-next-line complexity
  render () {
    const {
      address,
      // balance,
      // prices,
      selectedBlockchainName,
      // tokens,
      // wallet,
    } = this.props

    const selectedTokenSymbol: string | null = this.state.selectedToken &&
      this.state.selectedToken.symbol ||
      null

    const CT = this.props.walletTokensAndBalance && 
      selectedTokenSymbol &&
      this.props.walletTokensAndBalance.tokens
        .find( (tObj) => {
          return Object.keys(tObj)[0] === selectedTokenSymbol
        })
    const currentTokenBalance = (CT && selectedTokenSymbol) ? CT[selectedTokenSymbol].balance : null

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.formHeader}>
          <Text style={styles.walletTitle}>
            {
              `My ${selectedBlockchainName} Wallet`
            }
          </Text>
          <Text style={styles.walletAddress}>
            {
              address
            }
          </Text>
          <Separator style={styles.separatorDark} />
          <TokenSelector
            selectedToken={this.state.selectedToken && this.state.selectedToken}
            onPress={this.handlePressOnTokenSelector}
          />
          <Separator style={styles.separatorDark} />
          <Text style={styles.walletValue}>
            {
              this.state.selectedToken && [
                this.state.selectedToken.symbol,
                this.state.selectedToken.amount,
              ].join(' ')
            }
          </Text>
          <Text style={styles.walletBalance}>
            {this.props.selectedCurrency} {currentTokenBalance && currentTokenBalance.toFixed(2)}
          </Text>
        </View>
        <View style={styles.formBody}>
          <Image
            source={require('../images/coin-time-small.png')}
            style={styles.tokenImage}
          />
          <Input
            placeholder='Recipient Address'
            onChangeText={this.handleRecipientInput}
            value={this.state.recipient}
          />
          <Input
            placeholder={`Amount, ${selectedTokenSymbol}`}
            keyboardType='numeric'
            onChangeText={this.handleAmountInput}
            value={this.state.amount != null ? this.state.amount.toString() : ''}
          />
          <Text style={styles.sendBalance}>
            {
              `${this.props.selectedCurrency} ${this.state.amountInCurrency.toFixed(2)}`
            }
          </Text>
          <SectionHeader title='Fee' />
          <FeeSlider
            tokenSymbol={selectedTokenSymbol}
            selectedCurrency={this.props.selectedCurrency}
            calculatedFeeValue={this.state.gasFeeAmount}
            calculatedFeeValueInSelectedCurrency={this.state.gasFeeAmountInCurrency}
            maximumValue={1.9}
            minimumValue={0.1}
            value={this.state.feeMultiplier}
            step={0.1}
            handleValueChange={this.onFeeSliderChange}
          />
          <Text style={styles.advancedFee}>
            Advanced Fee
          </Text>
          <SectionHeader title='Create template (optional)' />
          <Input placeholder='Template name' />
          <Separator style={styles.separatorLight} />
          <Text style={styles.scanQR}>
            Scan QR Code
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const TokenSelector = ({ onPress, selectedToken }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.tokenSelector}>
        {
          selectedToken && selectedToken.symbol &&
            <Text style={styles.tokenSelectorLabel}>
              {
                selectedToken.symbol
              }
            </Text>
        }
        <Image source={require('../images/chevron-right.png')} />
      </View>
    </TouchableOpacity>
  )
}

export default connect(makeMapStateToProps, null)(Send)

const Input = (props) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholderTextColor='#7F7F7F'
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  separatorLight: {
    backgroundColor: '#707070', 
  },
  separatorDark: {
    backgroundColor: '#424066',
  },
  formHeader: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  walletTitle: {
    color: colors.background,
    marginTop: 30,
    marginHorizontal: 20,
    fontWeight: '700',
    fontSize: 16,
  },
  walletAddress: {
    color: '#A3A3CC',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  walletValue: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 30,
  },
  walletBalance: {
    marginHorizontal: 20,
    color: '#A3A3CC',
    fontSize: 16,
    marginTop: 4,
  },
  tokenSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  tokenSelectorLabel: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  tokenImage: {
    width: 64,
    height: 64,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: -32,
    right: 20,
  },
  formBody: {
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingTop: 30,
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C7C7CC',
    marginLeft: 20,
    marginVertical: 8,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '200',
  },
  sendBalance: {
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '200',
    color: '#7F7F7F',
    marginBottom: 30,
  },
  advancedFee: {
    margin: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#786AB7',
    marginBottom: 30,
  },
  scanQR: {
    textAlign: 'center',
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
    margin: 20,
  },
})
