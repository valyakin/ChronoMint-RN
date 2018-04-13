/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  Alert,
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
  mainTransfer,
  ETH,
} from 'redux/mainWallet/actions'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import Amount from 'models/Amount'
import colors from 'utils/colors'
import FeeSlider from 'components/FeeSlider'
import SectionHeader from 'components/SectionHeader'
import Separator from 'components/Separator'
import tokenService from 'services/TokenService'

const makeMapStateToProps = (origState, origProps) => {
  const token = origState.get(DUCK_TOKENS).item(ETH)
  const getWalletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress(origProps.blockchainTitle)
  const mapStateToProps = (state, ownProps) => {
    const walletTokensAndBalance = getWalletTokensAndBalanceByAddress(state, ownProps)
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

const mapDispatchToProps  = (dispatch) => {
  return {
    mainTransfer: (
      token,
      amount,
      recipient,
      feeMultiplier,
    ) => dispatch(mainTransfer(token, amount, recipient, feeMultiplier)),
  }
}

class Send extends React.PureComponent {

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

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!prevState.selectedToken && nextProps.walletTokensAndBalance && nextProps.walletTokensAndBalance.tokens) {
      const firstTokenInRow = nextProps.walletTokensAndBalance.tokens[0]
      return {
        selectedToken: {
          amount: Object.values(firstTokenInRow).amount,
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
  }

  handleNavigatorEvent = ({ type, id }) => {
    if (type === 'NavBarButtonPress') {
      switch (id) {
        case 'cancel': {
          this.props.navigator.pop()
          break
        }
        case 'done': {
          Alert.alert('Work in progress', 'Sorry, sending transaction still in development', [{ text: 'Cancel', onPress: () => {}, style: 'cancel' }])
          // [AO] Please keep the comments below
 
          // this.props.navigator.push({
          //   screen: 'ConfirmSend',
          //   title: 'Confirm Send',
          //   passProps: {
          //     amount: this.state.amount,
          //     feeMultiplier: this.state.feeMultiplier,
          //     recipient: this.state.recipient,
          //     usd: 1.44,
          //   },
          // })
        }
        // case 'done': {
        //   // TODO: To move it into separate function
        //   const token: TTokenModel = this.props.tokensDuck.item(this.state.selectedToken.id)
        //   // console.log(token.toJS())
        //   const toSendBigNumber: BigNumber = new BigNumber(this.state.amount)
        //   // console.log(toSendBigNumber)
        //   const bnWithDecimals: TAmountModel = token.addDecimals(toSendBigNumber)
        //   // console.log(bnWithDecimals)
        //   const amountToSend: TAmountModel = new Amount(bnWithDecimals, this.state.selectedToken.id)
        //   // console.log(amountToSend)
        //   const recipient: string = this.state.recipient
        //   const feeMultiplier = token.fee()
        //   // console.log(token, amountToSend, recipient, feeMultiplier)
        //   this.props.mainTransfer(token, amountToSend, recipient, feeMultiplier)
        //   break
        // }
      }
    }
  }

  // FIXME: to move 'this.props.mainTransfer' call from handleNavigatorEvent to external method
  //
  // handleSubmit = (values) => {
  //   const { wallet, tokens } = this.props
  //   const { action, symbol, amount, recipient, feeMultiplier } = values.toJS()
  //   const token = tokens.item(symbol)

  //   const value = new Amount(token.addDecimals(amount), symbol)

  //   // TODO: No multisig wallets here.
  //   // See to the handleSubmit methiod at mint/src/components/dashboard/SendTokens/SendTokens.jsx
  //   switch (action) {
  //     case ACTION_APPROVE:
  //       this.props.mainApprove(token, value, recipient, feeMultiplier)
  //       break
  //     case ACTION_TRANSFER:
  //         this.props.mainTransfer(token, value, recipient, feeMultiplier)
  //         break
  //   }
  // }

  handleSubmitSuccess = () => {
    this.props.navigator.pop()
  }

  handleRecipientInput = (value: string) => {
    this.setState({
      recipient: value,
      isRecipientInputValid: (value && (value.length >= 40 || value.length <= 44) && value.startsWith('0x') ), // TODO: need to implement real validaton, this is only for ETH
    }, () => {
      if (this.state.isAmountInputValid) {
        this.requestGasEstimations(this.state.recipient, this.state.amount)
      }
    })
  }

  handleAmountInput = (value: number) => {
    const tokenPrice = this.props.prices && this.props.prices[ this.state.selectedToken.symbol ][ this.props.selectedCurrency ] || 0 // TODO: handle wrong values correctly
    this.setState({
      amount: value,
      amountInCurrency: tokenPrice * value,
      isAmountInputValid: (value && value !== '' && value > 0), // TODO: need to implement real validaton
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
      // eslint-disable-next-line no-underscore-dangle
      this.state.selectedDAO._estimateGas(to, value)
        .then( ({ gasFee }) => {
          const newGasFee = (new Amount(this.state.selectedDAO.removeDecimals(gasFee.mul(this.state.feeMultiplier)))).toNumber()
          const tokenPrice = this.props.prices && this.props.prices[ this.state.selectedToken.symbol ][ this.props.selectedCurrency ] || 0 // TODO: handle wrong values correctly
          const newGasFeePrice = newGasFee * tokenPrice
          this.setState({
            gasFee,
            gasFeeAmount: newGasFee,
            gasFeeAmountInCurrency: newGasFeePrice,
          })
        })
        .catch( (error) => console.log('Error during fetching gasPrice. No info how to handle it.') )
    }
  }

  onFeeSliderChange = (value: number) => {
    if (this.state.gasFee !== null) {
      const newGasFee = (new Amount(this.state.selectedDAO.removeDecimals(this.state.gasFee.mul(this.state.feeMultiplier)))).toNumber()
      const tokenPrice = this.props.prices && this.props.prices[ this.state.selectedToken.symbol ][ this.props.selectedCurrency ] || 0 // TODO: handle wrong values correctly
      const newGasFeePrice = newGasFee * tokenPrice
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
      balance,
      prices,
      selectedBlockchainName,
      tokens,
      wallet,
    } = this.props

    const CT = this.props.walletTokensAndBalance && 
      this.state.selectedToken &&
      this.props.walletTokensAndBalance.tokens
        .find( (tObj) => {
          return Object.keys(tObj)[0] === this.state.selectedToken.symbol
        })
    const currentTokenBalance = CT ? CT[this.state.selectedToken.symbol].balance : null
 
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
            placeholder={`Amount, ${this.state.selectedToken && this.state.selectedToken.symbol}`}
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
            tokenSymbol={this.state.selectedToken && this.state.selectedToken.symbol}
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

export default connect(makeMapStateToProps, mapDispatchToProps)(Send)

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
