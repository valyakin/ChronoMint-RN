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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import { NavigationEvents } from 'react-navigation'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import { BLOCKCHAIN_BITCOIN } from '@chronobank/bitcoin/constants'
import FeeSlider from '../../../components/FeeSlider'
import Input from '../../../components/Input'
import Separator from '../../../components/Separator'
import {
  coin_bitcoin,
  coin_ethereum,
  coin_time_small,
  scan_qr,
} from '../../../images'
import ConfirmSendModal from './Modals/ConfirmSendModal'
import PasswordEnterModal from './Modals/PasswordEnterModal'
import QRscanner from '../QRscannerModal'
import styles from './SendStyles'

export default class Send extends PureComponent {

  render () {
    const {
      onTogglePasswordModal,
      onCloseConfirmModal,
      onPasswordConfirm,
      onSendConfirm,
      showPasswordModal,
      showConfirmModal,
      showQRscanner,
      error,
      amountInCurrency,
      blockchain,
      price,
      feeMultiplier,
      fee,
      feeInCurrency,
      onFeeSliderChange = () => { },
      selectedCurrency,
      selectedToken,
      selectedWallet,
      onTxDraftCreate,
      onTxDraftRemove,
      onQRpageOpen,
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

    const currentTokenBalance = selectedWallet.tokens ?
      selectedWallet.tokens[Object.keys(selectedWallet.tokens)[0]].amount :
      0


    const strings = {
      amountInput: `Amount, ${selectedToken && selectedToken.symbol || ''}`,
      walletValue: selectedToken && [selectedToken.symbol, selectedToken.amount].join(' '),
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
            visible={showPasswordModal}
            modalToggle={onTogglePasswordModal}
            error={error}
            confirmPassword={onPasswordConfirm}
          />
        }
        {
          showConfirmModal && <ConfirmSendModal
            visible={showConfirmModal}
            modalToggle={onCloseConfirmModal}
            sendConfirm={onSendConfirm}
            onTxDraftRemove={onTxDraftRemove}
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
            style={styles.textInput}
            keyboardType='numeric'
            onChange={onChangeAmount}
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
            calculatedFeeValue={fee}
            calculatedFeeValueInSelectedCurrency={feeInCurrency}
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

Send.propTypes = {
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
