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
import * as Yup from 'yup'
import BigNumber from 'bignumber.js'
import * as EthereumThunks from '@chronobank/ethereum/redux/thunks'
import {
  getNonce,
  estimateGas,
  getGasPrice,
  getChainId,
} from '@chronobank/ethereum/middleware/thunks'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { balanceToAmount, amountToBalance } from '@chronobank/ethereum/utils/amount'
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { selectMarketPrices, selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { isValidETHAddress } from '@chronobank/ethereum/utils'
import TextButton from '../../../components/TextButton'
import styles from './SendEthStyles'
import SendEth from './SendEth'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    masterWalletAddress,
    selectedCurrency: selectCurrentCurrency(state),
    prices: selectMarketPrices(state),
    currentEthWallet: getCurrentEthWallet(masterWalletAddress)(state),
    network: getCurrentNetwork(state),
  }
}

const ActionCreators = { ...EthereumThunks, getNonce, estimateGas, getGasPrice, getChainId }
const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch)

class SendEthContainer extends React.Component {
  constructor (props) {
    super(props)
    const firtsAvailableToken = props.navigation.state.params.token
    const selectedToken = {
      symbol: firtsAvailableToken.symbol,
      amount: firtsAvailableToken.amount,
      balance: firtsAvailableToken.balance,
      decimals: firtsAvailableToken.decimals,
    }
    this.state = {
      amountInCurrency: 0,
      confirmSendModal: false,
      enterPasswordModal: false,
      showQRscanner: false,
      error: null,
      gasLimit: null,
      defaultGasPrice: null,
      gasPrice: null,
      gasPriceInCurrency: null,
      feeMultiplier: 1,
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

  componentDidUpdate (prevProps) {
    if (prevProps.navigation.state.params) {
      if (prevProps.navigation.state.params.token.symbol !== this.props.navigation.state.params.token.symbol) {
        const selectedToken = {
          symbol: this.props.navigation.state.params.token.symbol,
          balance: this.props.navigation.state.params.token.balance,
          amount: this.props.navigation.state.params.token.amount,
          decimals: this.props.navigation.state.params.token.decimals,
        }
        this.setState({ selectedToken })
      }
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
    updateEthereumTxDraftTo: PropTypes.func,
    createEthereumTxDraft: PropTypes.func,
    deleteEthereumTxDraft: PropTypes.func,
    estimateGas: PropTypes.func,
    updateEthereumTxDraftValue: PropTypes.func,
    updateEthereumTxDraftGasLimit: PropTypes.func,
    getNonce: PropTypes.func,
    getGasPrice: PropTypes.func,
    getChainId: PropTypes.func,
    updateEthereumTxDraftGasPrice: PropTypes.func,
    updateEthereumTxDraftChainIdNonce: PropTypes.func,
    masterWalletAddress: PropTypes.string,
    selectedCurrency: PropTypes.string,
    currentEthWallet: PropTypes.shape({}),
    network: PropTypes.shape({}),
    prices: PropTypes.shape({}),
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          blockchain: PropTypes.string,
          token: PropTypes.shape({
            symbol: PropTypes.string,
            amount: PropTypes.string,
            decimals: PropTypes.number,
          }),
        }),
      }),
    }),
  }

  componentDidMount () {
    this.props.navigation.setParams({ handleGoToPasswordModal: this.handleGoToPasswordModal })
  }

  getDataForGasEstimation = () => {
    const {
      getNonce,
      getGasPrice,
      getChainId,
      updateEthereumTxDraftChainIdNonce,
      updateEthereumTxDraftGasPrice,
      masterWalletAddress,
    } = this.props

    Promise.all([
      getGasPrice(),
      getChainId(),
      getNonce(masterWalletAddress),
    ])
      .then((results) => {
        this.setState({
          gasPrice: +results[0],
          defaultGasPrice: +results[0],
        })
        updateEthereumTxDraftGasPrice({
          masterWalletAddress,
          gasPrice: +results[0],
        })
        updateEthereumTxDraftChainIdNonce({
          masterWalletAddress,
          chainId: results[1],
          nonce: results[2],
        })
      })
      .catch((error) => {
        Alert.alert('Error, while making a gasprice, chainid, nonce requests to middleware.')
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }

  handleGoToPasswordModal = () => {
    if (this.state.inputRecipientIsValid && this.state.inputAmountIsValid) {
      this.handleTogglePasswordModal()
    }
  }

  validateRecipient = (recipient) => {
    const validationSchema = Yup.string()
      .typeError('Recipient must be a string')
      .required('Recipient is required field')
      .test('is-valid-address', 'Recipient must be a valid ETH address', isValidETHAddress)
    return validationSchema.validate(recipient)
  }

  handleChangeRecipient = (name, value) => {
    if (typeof value === 'string') {
      const {
        updateEthereumTxDraftTo,
        masterWalletAddress,
      } = this.props

      this.validateRecipient(value).then(() => {
        this.setState(
          {
            inputRecipientValue: value,
            inputRecipientIsValid: true,
            inputRecipientError: '',
          },
          () => {
            updateEthereumTxDraftTo({
              masterWalletAddress,
              to: value,
            }).then(() => {
              if (this.state.inputAmountIsValid && this.state.inputRecipientIsValid) {
                this.requestGasEstimations()
              }
            }).catch((error) => {
              throw new Error('Can not updateEthereumTxDraftTo, value:', value, error)
            })
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
      .lessThan(selectedToken.balance ,'Not enough funds')
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
        updateEthereumTxDraftValue,
        masterWalletAddress,
        selectedCurrency,
      } = this.props

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
            updateEthereumTxDraftValue({
              masterWalletAddress,
              value: newAmount,
            }).then(() => {
              if (this.state.inputRecipientIsValid && this.state.inputAmountIsValid) {
                this.requestGasEstimations()
              }
            }).catch((error) => {
              throw new Error('Can not updateEthereumTxDraftValue, value:', value, error)
            })
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
            const newAmount = preparedValue
              ? new BigNumber(preparedValue.replace(',', '').replace('.', '').replace(' ', '')).toNumber()
              : 0
            updateEthereumTxDraftValue({
              masterWalletAddress,
              value: newAmount,
            })
          }
        )
      })
    }
  }

  handleFeeSliderChange = (value) => {
    const {
      prices,
      updateEthereumTxDraftGasPrice,
      masterWalletAddress,
      selectedCurrency,
    } = this.props
    if (this.state.gasPrice !== null) {

      const tokenPrice =
        (prices &&
          this.state.selectedToken &&
          prices[this.state.selectedToken.symbol] &&
          prices[this.state.selectedToken.symbol][selectedCurrency]) ||
        0 // TODO: handle wrong values correctly

      let newGasPrice = this.state.gasPrice ? this.state.defaultGasPrice * +value : null
      newGasPrice = parseInt(newGasPrice)
      let newGasPriceInCurrency = newGasPrice ? newGasPrice * tokenPrice : null
      newGasPriceInCurrency = parseInt(newGasPriceInCurrency)

      this.setState({
        feeMultiplier: value,
        gasPrice: newGasPrice,
        gasPriceInCurrency: newGasPriceInCurrency,
      }, () => {
        updateEthereumTxDraftGasPrice({
          masterWalletAddress,
          gasPrice: newGasPrice,
        })
      })
    } else {
      this.setState({ feeMultiplier: value })
    }
  }

  requestGasEstimations = () => {
    const {
      estimateGas,
      currentEthWallet,
      updateEthereumTxDraftGasLimit,
      masterWalletAddress,
    } = this.props
    const {
      from,
      to,
      gasPrice,
      nonce,
    } = currentEthWallet.txDraft
    const { decimals } = this.state.selectedToken
    const estimationGasArguments = {
      from,
      to,
      value: balanceToAmount(this.state.inputAmountValue, decimals),
      gasPrice,
      nonce,
    }
    estimateGas(estimationGasArguments)
      .then((results) => {
        this.setState({
          gasLimit: results,
        }, () => {
          updateEthereumTxDraftGasLimit({
            masterWalletAddress,
            gasLimit: results,
          })
        })
      })
      .catch((error) => {
        Alert.alert('Error, while making a gas estimate request to middleware.')
        // eslint-disable-next-line no-console
        console.warn(error)
      })
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
    const { createEthereumTxDraft, masterWalletAddress } = this.props
    createEthereumTxDraft({ masterWalletAddress })
    this.getDataForGasEstimation()
  }

  handleTxDraftRemove = () => {
    const { deleteEthereumTxDraft, masterWalletAddress } = this.props
    deleteEthereumTxDraft({ masterWalletAddress })
  }

  handleQRpageOpen = () => {
    this.setState({ showQRscanner: !this.state.showQRscanner })
  }

  handleQRscan = (scannedAddress) => {
    this.handleChangeRecipient('recipient', scannedAddress.data)
  }

  handleSelectToken = () => {
    this.props.navigation.navigate('TokenSelector')
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
      gasPriceInCurrency,
      gasPrice,
      selectedToken,
      modalProps,
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
    const {
      blockchain,
    } = this.props.navigation.state.params
    const { currentEthWallet, prices, selectedCurrency } = this.props
    const blockchainPrice = prices &&
      prices[selectedToken.symbol] &&
      prices[selectedToken.symbol][selectedCurrency] || 0
    const formattedGasPrice = amountToBalance(gasPrice, selectedToken.decimals).toNumber()
    const formattedgasPriceInCurrency = amountToBalance(gasPriceInCurrency, selectedToken.decimals).toNumber()
    return (
      <SendEth
        amountInCurrency={amountInCurrency}
        blockchain={blockchain}
        feeMultiplier={feeMultiplier}
        gasPrice={formattedGasPrice}
        gasPriceInCurrency={formattedgasPriceInCurrency}
        onFeeSliderChange={this.handleFeeSliderChange}
        onSelectToken={this.handleSelectToken}
        selectedCurrency={selectedCurrency}
        selectedToken={selectedToken}
        selectedWallet={currentEthWallet}
        passProps={modalProps}
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

export default connect(mapStateToProps, mapDispatchToProps)(SendEthContainer)
