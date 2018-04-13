/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
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
import { mainTransfer, ETH } from 'redux/mainWallet/actions'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import tokenService from 'services/TokenService'
import colors from 'utils/colors'
import FeeSlider from 'components/FeeSlider'
import SectionHeader from 'components/SectionHeader'
import Separator from 'components/Separator'

import {
  makeGetWalletTokensAndBalanceByAddress,
} from 'redux/wallet/selectors'

const makeMapStateToProps = (origState, origProps) => {
  const token = origState.get(DUCK_TOKENS).item(ETH)
  const getWalletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress(origProps.blockchainTitle)
  const mapStateToProps = (state, ownProps) => {
    const walletTokensAndBalance = getWalletTokensAndBalanceByAddress(state, ownProps)
    return {
      walletTokensAndBalance,
      gasPriceMultiplier: getGasPriceMultiplier(token.blockchain())(state),
      token,
      tokensDuck: getWTokens()(state),
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

@connect(makeMapStateToProps, mapDispatchToProps)
export default class Send extends React.PureComponent {

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

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  state = {
    // FIXME: to delete and to make it unseen! 
    selectedToken: (
      this.props.walletTokensAndBalance &&
      this.props.walletTokensAndBalance.tokens &&
      this.props.walletTokensAndBalance.tokens[0] &&
      {
        amount: Object.values(this.props.walletTokensAndBalance.tokens[0]).amount,
        symbol: Object.keys(this.props.walletTokensAndBalance.tokens[0]),
      }
    ),
    fee: 1,
    recipient: '',
    amount: null,
    amountInCurrency: 0,
    isRecipientInputValid: false,
    isAmountInputValid: false,
  }

  handleNavigatorEvent = ({ type, id }) => {
    if (type === 'NavBarButtonPress') {
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
              amount: this.state.amount,
              fee: this.state.fee,
              recipient: this.state.recipient,
              usd: 1.44,
            },
          })
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
    })
  }

  handleAmountInput = (value: number) => {
    const tokenPrice = this.props.prices[ ETH ] && this.props.prices[ this.state.selectedToken.symbol ][ 'USD' ]
    this.setState({
      amount: value,
      amountInCurrency: tokenPrice * value,
      isAmountInputValid: (value > 0)
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
            }
          })
        },
      },
    })
  }

  onFeeSliderChange = (value: number) => {
    this.setState({
      fee: value,
    })
  }

  render () {
    const {
      address,
      balance,
      prices,
      selectedBlockchainName,
      tokens,
      wallet,
    } = this.props

    const currentTokenBalance = this.props.walletTokensAndBalance.tokens
      .filter( (tObj) => {
        return Object.keys(tObj)[0] === this.state.selectedToken.symbol
      })
      .reduce ( (acc, value) => {
        acc = value[this.state.selectedToken.symbol].balance
        return acc
      }, 0)

    return (
      <ScrollView
        style={styles.scrollView}
      >
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
            selectedToken={this.state.selectedToken}
            onPress={this.handlePressOnTokenSelector}
          />
          <Separator style={styles.separatorDark} />
          <Text style={styles.walletValue}>
            {
              [
                this.state.selectedToken.symbol,
                this.state.selectedToken.amount,
              ].join(' ')
            }
          </Text>
          <Text style={styles.walletBalance}>
            USD {currentTokenBalance.toFixed(2)}
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
            placeholder={`Amount, ${this.state.selectedToken.symbol}`}
            keyboardType='numeric'
            onChangeText={this.handleAmountInput}
            value={this.state.amount != null ? this.state.amount.toString() : ''}
          />
          <Text style={styles.sendBalance}>
            {
              `USD ${this.state.amountInCurrency.toFixed(2)}`
            }
          </Text>
          <SectionHeader title='Fee' />
          <FeeSlider
            tokenID={this.state.selectedToken.symbol}
            maximumValue={1.9}
            minimumValue={0.1}
            value={this.state.fee}
            step={0.1}
            feeRate={this.props.token.feeRate().toNumber()}
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
