/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import * as Yup from 'yup'
import * as BitcoinThunks from '@chronobank/bitcoin/redux/thunks'
import {
  requestBitcoinUtxoByAddress,
  requestBitcoinEstimateFeeRate,
} from '@chronobank/bitcoin/service/api'
import { prepareBitcoinTransaction, isValidBTCAddress } from '@chronobank/bitcoin/utils'
import { getBitcoinCurrentWallet } from '@chronobank/bitcoin/redux/selectors'
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { convertBTCToSatoshi, convertSatoshiToBTC } from '@chronobank/bitcoin/utils/amount'
import { selectMarketPrices, selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import TextButton from '../../../components/TextButton'
import styles from './SendStyles'
import Send from './Send'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    masterWalletAddress,
    selectedCurrency: selectCurrentCurrency(state),
    prices: selectMarketPrices(state) ,
    currentBTCWallet: getBitcoinCurrentWallet(masterWalletAddress)(state),
    network: getCurrentNetwork(state),
  }
}


const ActionCreators = {
  ...BitcoinThunks,
  requestBitcoinUtxoByAddress,
  requestBitcoinEstimateFeeRate,
}
const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch)

class SendContainer extends React.Component {
  constructor (props) {
    super(props)
    const first = Object.keys(props.currentBTCWallet.tokens)[0]
    const firtsAvailableToken = props.currentBTCWallet.tokens[first]
    const selectedToken = {
      symbol: firtsAvailableToken.symbol,
      amount: firtsAvailableToken.amount,
    }
    this.state = {
      amountInCurrency: 0,
      confirmSendModal: false,
      enterPasswordModal: false,
      showQRscanner: false,
      error: null,
      fee: null,
      feeEstimation: 1,
      feeInCurrency: null,
      feeMultiplier: 1,
      gasFee: null,
      gasFeeAmount: null,
      gasFeeAmountInCurrency: null,
      firtsAvailableToken,
      selectedToken,

      inputAmountValue: '',
      inputAmountIsValid: false,
      inputAmountError: 'Amount is required field',
      inputAmountTouched: false,

      inputRecipientValue: '',
      inputRecipientIsValid: false,
      inputRecipientError: 'Recipient is required field',
      inputRecipientTouched: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      ...params,
      headerRight: (
        <TextButton
          style={styles.headerButton}
          onPress={params.handleGoToPasswordModal}
          label='Done'
        />
      ),
    }
  }

  static propTypes = {
    masterWalletAddress: PropTypes.string,
    selectedCurrency: PropTypes.string,
    createBitcoinTxDraft: PropTypes.func,
    updateBitcoinTxDraftRecipient: PropTypes.func,
    updateBitcoinTxDraftAmount: PropTypes.func,
    updateBitcoinTxDraftToken: PropTypes.func,
    updateBitcoinTxDraftFee: PropTypes.func,
    updateBitcoinTxDraftFeeMultiplier: PropTypes.func,
    updateBitcoinTxDraftUnsignedTx: PropTypes.func,
    deleteBitcoinTxDraft: PropTypes.func,
    requestBitcoinUtxoByAddress: PropTypes.func,
    requestBitcoinEstimateFeeRate: PropTypes.func,
    currentBTCWallet: PropTypes.shape({}),
    network: PropTypes.shape({}),
    prices: PropTypes.shape({}),
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          blockchain: PropTypes.string,
        }),
      }),
    }),
  }

  componentDidMount () {
    this.props.navigation.setParams({ handleGoToPasswordModal: this.handleGoToPasswordModal })
  }

  handleGoToPasswordModal = () => {
    const {
      blockchain,
    } = this.props.navigation.state.params
    const {
      requestBitcoinUtxoByAddress,
      network,
      updateBitcoinTxDraftToken,
      updateBitcoinTxDraftUnsignedTx,
      masterWalletAddress,
      currentBTCWallet,
    } = this.props
    const { address } = currentBTCWallet

    if (this.state.inputRecipientIsValid && this.state.inputAmountIsValid) {
      updateBitcoinTxDraftToken({
        address,
        masterWalletAddress,
        token: this.state.selectedToken.symbol,
      })

      const tx = {
        to: this.state.inputRecipientValue,
        from: address,
        value: convertBTCToSatoshi(this.state.inputAmountValue),
      }

      requestBitcoinUtxoByAddress(address)
        .then((results) => {
          if (results && results.payload.data) {
            prepareBitcoinTransaction({
              tx,
              blockchain,
              feeRate: this.state.feeEstimation,
              feeMultiplier: this.state.feeMultiplier,
              network: network.networkType,
              utxos: results.payload.data,
            })
              .then((transaction) => {
                updateBitcoinTxDraftUnsignedTx({
                  address,
                  masterWalletAddress,
                  unsignedTx: transaction.prepared.buildIncomplete().toHex(),
                })

                this.handleTogglePasswordModal()
              })
              .catch((error) => {
                Alert.alert("Error, while preparing bitcoin transaction.")
                // eslint-disable-next-line no-console
                console.warn(error)
              })
          }
        })
        .catch((error) => {
          Alert.alert("Error, while making an UTXO request to middleware.")
          // eslint-disable-next-line no-console
          console.warn(error)
        })


    }
  }

  validateRecipient = (recipient) => {
    const { network } = this.props

    const validationSchema = Yup.string()
      .typeError('Recipient must be a string')
      .required('Recipient is required field')
      .test('is-valid-address', 'Recipient must be a valid BTC address', (value) => isValidBTCAddress(value, network.networkType))
    return validationSchema.validate(recipient)
  }

  handleChangeRecipient = (name, value) => {
    if (typeof value === 'string') {
      const {
        updateBitcoinTxDraftRecipient,
        masterWalletAddress,
        currentBTCWallet,
      } = this.props
      const { address } = currentBTCWallet

      this.validateRecipient(value).then(() => {
        this.setState(
          {
            inputRecipientValue: value,
            inputRecipientIsValid: true,
            inputRecipientError: '',
          },
          () => {
            updateBitcoinTxDraftRecipient({
              address,
              masterWalletAddress,
              recipient: this.state.inputRecipientValue,
            })
            if (this.state.inputAmountIsValid) {
              this.requestBcFeeEstimations()
            }
          }
        )
      }).catch((error) => {
        this.setState(
          {
            inputRecipientValue: value,
            inputRecipientIsValid: false,
            inputRecipientError: error.message,
          },
        )
      })
    }
  }

  validateAmount = (amount) => {
    const { selectedToken } = this.state
    const validationSchema = Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required field')
      .moreThan(0, 'Amount must be a positive number')
      .lessThan(selectedToken.amount ,'Not enough funds')
    return validationSchema.validate(amount)
  }

  handleChangeAmount = (name, value) => {
    if (typeof value === 'string') {
      const preparedValue = value
        .replace(' ', '')
        .replace(',', '.')
        .replace(/[^0-9.]/g, '')
        // strip second dot
        .replace(/(.*\..*)\.(.*)/, (str, g1, g2) => g1 + g2)
        // strip leading zeros
        .replace(/0+(0\..+)/, (str, g1) => g1)

      const {
        prices,
        updateBitcoinTxDraftAmount,
        masterWalletAddress,
        selectedCurrency,
        currentBTCWallet,
      } = this.props

      const { address } = currentBTCWallet

      const tokenPrice = (prices
        && this.state.selectedToken
        && prices[this.state.selectedToken.symbol]
        && prices[this.state.selectedToken.symbol][selectedCurrency])
        || 0 // TODO: handle wrong values correctly


      this.validateAmount(preparedValue).then((newAmount) => {
        this.setState(
          {
            inputAmountValue: preparedValue,
            inputAmountIsValid: true,
            inputAmountError: '',
            amountInCurrency: tokenPrice * newAmount,
          },
          () => {
            updateBitcoinTxDraftAmount({
              address,
              masterWalletAddress,
              amount: newAmount,
            })
            if (this.state.inputRecipientIsValid) {
              this.requestBcFeeEstimations()
            }
          }
        )
      }).catch((error) => {
        this.setState(
          {
            inputAmountValue: preparedValue,
            inputAmountIsValid: false,
            inputAmountError: error.message,
            amountInCurrency: 0,
          },
          () => {
            const newAmount = value
              ? new BigNumber(value.replace(',', '').replace('.', '').replace(' ', '')).toNumber()
              : 0
            updateBitcoinTxDraftAmount({
              address,
              masterWalletAddress,
              amount: newAmount,
            })
          }
        )
      })
    }
  }

  handleFeeSliderChange = (value) => {
    const {
      prices,
      updateBitcoinTxDraftFeeMultiplier,
      updateBitcoinTxDraftFee,
      masterWalletAddress,
      selectedCurrency,
      currentBTCWallet,
    } = this.props
    const {
      address,
    } = currentBTCWallet
    if (this.state.fee !== null) {
      const fee =
        this.state.feeEstimation && this.state.feeEstimation * this.state.feeMultiplier
      const tokenPrice =
        (prices &&
          this.state.selectedToken &&
          prices[this.state.selectedToken.symbol] &&
          prices[this.state.selectedToken.symbol][selectedCurrency]) ||
        0 // TODO: handle wrong values correctly
      const newFeePrice = fee ? fee * tokenPrice : null
      this.setState({
        feeMultiplier: value,
        fee,
        feeInCurrency: newFeePrice,
      }, () => {
        updateBitcoinTxDraftFeeMultiplier({
          address,
          masterWalletAddress,
          feeMultiplier: this.state.feeMultiplier,
        })
        updateBitcoinTxDraftFee({
          address,
          masterWalletAddress,
          fee: this.state.feeEstimation * this.state.feeMultiplier,
        })
      })
    } else {
      this.setState({
        feeMultiplier: value,
      }, () => {

        const fee = this.state.feeEstimation * this.state.feeMultiplier

        updateBitcoinTxDraftFeeMultiplier({
          address,
          masterWalletAddress,
          feeMultiplier: this.state.feeMultiplier,
        })
        updateBitcoinTxDraftFee({
          address,
          masterWalletAddress,
          fee,
        })
        this.setState({
          fee,
        })
      })
    }
  }

  requestBcFeeEstimations = () => {
    const {
      prices,
      requestBitcoinEstimateFeeRate,
      updateBitcoinTxDraftFee,
      masterWalletAddress,
      selectedCurrency,
      currentBTCWallet,
    } = this.props

    const { address } = currentBTCWallet

    if (this.state.selectedToken) {
      requestBitcoinEstimateFeeRate()
        .then((results) => {
          const feeEstimation = parseFloat(convertSatoshiToBTC(results.payload.data.avgFee))
          const tokenPrice =
            (prices &&
              this.state.selectedToken &&
              prices[this.state.selectedToken.symbol] &&
              prices[this.state.selectedToken.symbol][selectedCurrency]) ||
            0 // TODO: handle wrong values correctly
          const newFeePrice = feeEstimation ? feeEstimation * tokenPrice : null
          this.setState({
            feeEstimation,
            fee: feeEstimation,
            feeInCurrency: newFeePrice,
          }, () => {
            updateBitcoinTxDraftFee({
              address,
              masterWalletAddress,
              fee: feeEstimation,
            })
          })
        })
        .catch((error) => {
          Alert.alert("Error, while making a fee estimate request to middleware.")
          // eslint-disable-next-line no-console
          console.warn(error)
        })
    }
  }

  handleTogglePasswordModal = () => {
    this.setState({
      enterPasswordModal: !this.state.enterPasswordModal,
    })
  }

  handleCloseConfirmModal = () => {
    this.setState({
      confirmSendModal: false,
    })
  }

  handlePasswordConfirm = () => {
    this.setState({
      confirmSendModal: true,
      enterPasswordModal: false,
    })
  }

  handleSendConfirm = () => {
    this.handleCloseConfirmModal()
    this.props.navigation.navigate('Wallet')
  }

  handleTxDraftCreate = () => {
    const { createBitcoinTxDraft, masterWalletAddress, currentBTCWallet } = this.props
    const { address } = currentBTCWallet
    createBitcoinTxDraft({ address, masterWalletAddress })
  }

  handleTxDraftRemove = () => {
    const { deleteBitcoinTxDraft, masterWalletAddress, currentBTCWallet } = this.props
    const { address } = currentBTCWallet
    deleteBitcoinTxDraft({ address, masterWalletAddress })
  }

  handleQRpageOpen = () => {
    this.setState({ showQRscanner: !this.state.showQRscanner })
  }

  handleQRscan = (scannedAddress) => {
    this.handleChangeRecipient('recipient', scannedAddress.data)
  }

  handleTouchAmount = () => {
    this.setState({ inputAmountTouched: true })
  }

  handleTouchRecipient = () => {
    this.setState({ inputRecipientTouched: true })
  }

  render () {
    const {
      enterPasswordModal,
      confirmSendModal,
      error,
      amountInCurrency,
      feeMultiplier,
      feeInCurrency,
      fee,
      selectedToken,
      showQRscanner,

      inputRecipientValue,
      inputRecipientIsValid,
      inputRecipientTouched,
      inputRecipientError,
      inputAmountValue,
      inputAmountIsValid,
      inputAmountTouched,
      inputAmountError,
    } = this.state
    const { currentBTCWallet, prices, selectedCurrency, navigation } = this.props
    const {
      blockchain,
    } = navigation.state.params
    const blockchainPrice = prices &&
      prices[selectedToken.symbol] &&
      prices[selectedToken.symbol][selectedCurrency]
    return (
      <Send
        amountInCurrency={amountInCurrency}
        blockchain={blockchain}
        feeMultiplier={feeMultiplier}
        fee={fee}
        feeInCurrency={feeInCurrency}
        onFeeSliderChange={this.handleFeeSliderChange}
        onSelectToken={this.handleSelectToken}
        selectedCurrency={selectedCurrency}
        selectedToken={selectedToken}
        selectedWallet={currentBTCWallet}
        //
        price={blockchainPrice}

        onTogglePasswordModal={this.handleGoToPasswordModal}
        onCloseConfirmModal={this.handleCloseConfirmModal}
        onPasswordConfirm={this.handlePasswordConfirm}
        onSendConfirm={this.handleSendConfirm}
        //state
        showPasswordModal={enterPasswordModal}
        showConfirmModal={confirmSendModal}
        showQRscanner={showQRscanner}
        error={error}
        //txDraft
        onTxDraftCreate={this.handleTxDraftCreate}
        onTxDraftRemove={this.handleTxDraftRemove}
        onQRpageOpen={this.handleQRpageOpen}
        onQRscan={this.handleQRscan}

        // input fields
        inputAmountValue={inputAmountValue}
        inputAmountIsValid={inputAmountIsValid}
        inputAmountError={inputAmountError}
        inputAmountTouched={inputAmountTouched}
        onAmountTouch={this.handleTouchAmount}
        onChangeAmount={this.handleChangeAmount}

        inputRecipientValue={inputRecipientValue}
        inputRecipientIsValid={inputRecipientIsValid}
        inputRecipientError={inputRecipientError}
        inputRecipientTouched={inputRecipientTouched}
        onRecipientTouch={this.handleTouchRecipient}
        onChangeRecipient={this.handleChangeRecipient}
      />
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer)
