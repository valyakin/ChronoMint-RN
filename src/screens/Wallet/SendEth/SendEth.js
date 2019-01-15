/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import { BLOCKCHAIN_BITCOIN } from '@chronobank/bitcoin/constants'
// import i18n from '../../../locales/translation'
import FeeSlider from '../../../components/FeeSlider'
import Input from '../../../components/Input'
import Separator from '../../../components/Separator'
import { NavigationEvents } from 'react-navigation'
import {
  chevron_right,
  coin_bitcoin,
  coin_ethereum,
  coin_time_small,
  scan_qr,
} from '../../../images'
import ConfirmSendModal from './Modals/ConfirmSendModal'
import PasswordEnterModal from './Modals/PasswordEnterModal'
import QRscanner from '../QRscannerModal'
import styles from './SendEthStyles'

const TokenSelector = ({ onPress = () => { }, selectedToken }) => (
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
      <Image source={chevron_right} />
    </View>
  </TouchableOpacity>
)

TokenSelector.propTypes = {
  onPress: PropTypes.func,
  selectedToken: PropTypes.shape({}),
}

export default class SendEth extends PureComponent {

  render () {
    const {
      onTogglePasswordModal,
      onCloseConfirmModal,
      onPasswordConfirm,
      onSendConfirm,
      showPasswordModal,
      showConfirmModal,
      error,
      amountInCurrency,
      blockchain,
      price,
      // currentTokenBalance,
      feeMultiplier,
      gasPrice,
      gasPriceInCurrency,
      onFeeSliderChange = () => { },
      onSelectToken,
      selectedCurrency,
      selectedToken,
      selectedWallet,
      passProps,
      //txDraft
      onTxDraftCreate,
      onTxDraftRemove,
      onQRpageOpen,
      showQRscanner,
      onQRscan,

      inputRecipientValue,
      inputRecipientIsValid,
      inputRecipientTouched,
      inputRecipientError,
      onRecipientTouch,
      onChangeRecipient = () => { },
      inputAmountValue,
      inputAmountIsValid,
      inputAmountTouched,
      inputAmountError,
      onAmountTouch,
      onChangeAmount = () => { },
    } = this.props

    const currentTokenBalance = selectedToken ?
      selectedToken.balance :
      null


    const strings = {
      amountInput: `Amount, ${selectedToken && selectedToken.symbol || ''}`,
      walletValue: selectedToken && [selectedToken.symbol, selectedToken.balance].join(' '),
      walletTitle: `My ${blockchain} Wallet`,
      walletBalance: `${selectedCurrency} ${currentTokenBalance && price && (price * currentTokenBalance).toFixed(2)}`,
      sendBalance: `${selectedCurrency} ${amountInCurrency.toFixed(2)}`,
      advancedFee: 'Advanced Fee',
      scanQr: 'Scan QR code',
    }

    const cryptoImages = {
      [BLOCKCHAIN_ETHEREUM]: coin_ethereum,
      [BLOCKCHAIN_BITCOIN]: coin_bitcoin,
    }

    return (
      <KeyboardAwareScrollView
        style={styles.scrollView}
      >
        <NavigationEvents
          onDidFocus={onTxDraftCreate}
          onWillBlur={onTxDraftRemove}
        />
        {
          showQRscanner && <QRscanner
            visible={showQRscanner}
            modalToggle={onQRpageOpen}
            onQRscan={onQRscan}
          />
        }
        {
          showPasswordModal && <PasswordEnterModal
            passProps={passProps}
            visible={showPasswordModal}
            modalToggle={onTogglePasswordModal}
            error={error}
            confirmPassword={onPasswordConfirm}
            token={selectedToken}
          />
        }
        {
          showConfirmModal && <ConfirmSendModal
            visible={showConfirmModal}
            modalToggle={onCloseConfirmModal}
            sendConfirm={onSendConfirm}
            onTxDraftRemove={onTxDraftRemove}
            token={selectedToken}
          />
        }
        <View style={styles.formHeader}>
          <Text style={styles.walletTitle}>
            {
              strings.walletTitle
            }
          </Text>
          <Text style={styles.walletAddress}>
            {
              selectedWallet.address
            }
          </Text>
          <View>
            <Separator style={styles.separatorDark} />
            <TokenSelector
              selectedToken={selectedToken}
              onPress={onSelectToken}
            />
          </View>
          <Separator style={styles.separatorDark} />
          <Text style={styles.walletValue}>
            {
              strings.walletValue
            }
          </Text>
          <Text style={styles.walletBalance}>
            {
              strings.walletBalance
            }
          </Text>
        </View>
        <View style={styles.formBody}>
          <Image
            source={cryptoImages[blockchain] || coin_time_small}
            style={styles.tokenImage}
          />
          <View style={styles.recipientLine}>
            <Input
              placeholder='Recipient Address'
              onChange={onChangeRecipient}
              style={styles.textInput}
              value={inputRecipientValue}
              onTouch={onRecipientTouch}
            />
            <TouchableOpacity
              onPress={onQRpageOpen}
              style={styles.qrImageWrapper}>
              <Image
                source={scan_qr}
                style={styles.qrImage}
              />
            </TouchableOpacity>
          </View>
          {
            inputRecipientTouched && !inputRecipientIsValid &&
            <Text style={styles.errorText}>{ inputRecipientError }</Text>
          }
          <Input
            placeholder={strings.amountInput}
            keyboardType='numeric'
            style={styles.textInput}
            onChange={onChangeAmount}
            name='amount'
            value={inputAmountValue}
            onTouch={onAmountTouch}
          />
          {
            inputAmountTouched && !inputAmountIsValid &&
            <Text style={styles.errorText}>{ inputAmountError }</Text>
          }
          <Text style={styles.sendBalance}>
            {
              strings.sendBalance
            }
          </Text>
          <FeeSlider
            tokenSymbol={selectedToken && selectedToken.symbol}
            selectedCurrency={selectedCurrency}
            calculatedFeeValue={gasPrice}
            calculatedFeeValueInSelectedCurrency={gasPriceInCurrency}
            maximumValue={1.9}
            minimumValue={0.1}
            value={feeMultiplier}
            step={0.1}
            handleValueChange={onFeeSliderChange}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

SendEth.propTypes = {
  fee: PropTypes.number,
  feeInCurrency: PropTypes.number,
  onTogglePasswordModal: PropTypes.func,
  onCloseConfirmModal: PropTypes.func,
  onPasswordConfirm: PropTypes.func,
  onSendConfirm: PropTypes.func,
  PasswordEnterModal: PropTypes.func,
  ConfirmSendModal: PropTypes.func,
  showPasswordModal: PropTypes.bool,
  showConfirmModal: PropTypes.bool,
  error: PropTypes.string,

  inputAmountValue: PropTypes.string,
  inputAmountIsValid: PropTypes.bool,
  inputAmountError: PropTypes.string,
  inputAmountTouched: PropTypes.bool,
  onAmountTouch: PropTypes.func,

  inputRecipientValue: PropTypes.string,
  inputRecipientIsValid: PropTypes.bool,
  inputRecipientError: PropTypes.string,
  inputRecipientTouched: PropTypes.bool,
  onRecipientTouch: PropTypes.func,
}
