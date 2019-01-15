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
      amount: '',
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
      isAmountInputValid: false,
      isRecipientInputValid: false,
      recipient: '',
      firtsAvailableToken,
      selectedToken,
      amountTouched: false,
      recipientTouched: false,
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

  sendAmountValidationSchema = Yup.number()
    .required()
    .positive()

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
    if (this.state.isRecipientInputValid && this.state.isAmountInputValid) {
      this.handleTogglePasswordModal()
    }
  }

  handleChangeRecipient = (name, value) => {
    if (typeof value === 'string') {
      const {
        updateEthereumTxDraftTo,
        masterWalletAddress,
      } = this.props
      this.setState(
        {
          recipient: value,
          isRecipientInputValid: isValidETHAddress(value),
        },
        () => {
          updateEthereumTxDraftTo({
            masterWalletAddress,
            to: value,
          }).then(() => {
            if (this.state.isAmountInputValid && this.state.isRecipientInputValid) {
              this.requestGasEstimations()
            }
          }).catch((error) => {
            throw new Error('Can not updateEthereumTxDraftTo, value:', value, error)
          })
        }
      )
    }
  }

  handleChangeAmount = (name, value) => {
    if (typeof value === 'string') {
      const {
        prices,
        updateEthereumTxDraftValue,
        masterWalletAddress,
        selectedCurrency,
      } = this.props

      const tokenPrice =
        (prices &&
          this.state.selectedToken &&
          prices[this.state.selectedToken.symbol] &&
          prices[this.state.selectedToken.symbol][selectedCurrency]) ||
        0 // TODO: handle wrong values correctly

      if (value && !(value.endsWith(',') || value.endsWith('.'))) {
        const inputValue = value.replace(',', '.').replace(' ', '')
        const localeValue = new BigNumber(inputValue).toNumber()
        this.setState(
          {
            amount: inputValue,
            amountInCurrency: tokenPrice * localeValue,
            isAmountInputValid: this.sendAmountValidationSchema.isValidSync(localeValue) && localeValue <= +this.state.selectedToken.balance,
          },
          () => {
            updateEthereumTxDraftValue({
              masterWalletAddress,
              value: localeValue,
            }).then(() => {
              if (this.state.isRecipientInputValid && this.state.isAmountInputValid) {
                this.requestGasEstimations()
              }
            }).catch((error) => {
              throw new Error('Can not updateEthereumTxDraftValue, localeValue:', value, error)
            })
          }
        )
      } else {
        const newAmount = this.state.amount.endsWith('.') || this.state.amount.endsWith(',') || this.state.amount.endsWith(' ')
          ? this.state.amount
          : value.replace(',', '.').replace(' ', '')
        this.setState({
          amount: newAmount || '0',
          amountInCurrency: 0,
          isAmountInputValid: false,
        }, () => {
          const newAmount = value
            ? new BigNumber(value.replace(',', '').replace('.', '').replace(' ', '')).toNumber()
            : 0
          updateEthereumTxDraftValue({
            masterWalletAddress,
            value: newAmount,
          })
        })
      }
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
      value: balanceToAmount(this.state.amount, decimals),
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
    this.setState({ amountTouched: true })
  }

  handleTouchRecipient = () => {
    this.setState({ recipientTouched: true })
  }

  render () {
    const {
      enterPasswordModal,
      confirmSendModal,
      error,
      amount,
      amountInCurrency,
      feeMultiplier,
      gasPriceInCurrency,
      gasPrice,
      recipient,
      selectedToken,
      modalProps,
      showQRscanner,
      isRecipientInputValid,
      isAmountInputValid,
      recipientTouched,
      amountTouched,
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
        amount={amount}
        amountInCurrency={amountInCurrency}
        blockchain={blockchain}
        feeMultiplier={feeMultiplier}
        gasPrice={formattedGasPrice}
        gasPriceInCurrency={formattedgasPriceInCurrency}
        onChangeAmount={this.handleChangeAmount}
        onChangeRecipient={this.handleChangeRecipient}
        onFeeSliderChange={this.handleFeeSliderChange}
        onSelectToken={this.handleSelectToken}
        recipient={recipient}
        selectedCurrency={selectedCurrency}
        selectedToken={selectedToken}
        selectedWallet={currentEthWallet}
        passProps={modalProps}
        //
        price={blockchainPrice}

        onAmountTouched={this.handleTouchAmount}
        onRecipientTouched={this.handleTouchRecipient}

        onTogglePasswordModal={this.handleGoToPasswordModal}
        onCloseConfirmModal={this.handleCloseConfirmModal}
        onPasswordConfirm={this.handlePasswordConfirm}
        onSendConfirm={this.handleSendConfirm}
        //state
        isRecipientInputValid={isRecipientInputValid}
        isAmountInputValid={isAmountInputValid}
        showPasswordModal={enterPasswordModal}
        showConfirmModal={confirmSendModal}
        recipientTouched={recipientTouched}
        amountTouched={amountTouched}
        showQRscanner={showQRscanner}
        error={error}
        //txDraft
        onTxDraftCreate={this.handleTxDraftCreate}
        onTxDraftRemove={this.handleTxDraftRemove}
        onQRpageOpen={this.handleQRpageOpen}
        onQRscan={this.handleQRscan}
      />
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SendEthContainer)
