/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import TokenModel from 'models/tokens/TokenModel'
import TokensCollection from 'models/tokens/TokensCollection'
import colors from '../utils/colors'
import FeeSlider from '../components/FeeSlider'
import SectionHeader from '../components/SectionHeader'
import Separator from '../components/Separator'

export type TTokenModel = typeof TokenModel

export type TTokensCollectionModel = typeof TokensCollection

export type TAmBa = {
  amount: number,
  balance: number,
}

export type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}

export type TCalculatedToken = TPrices

export type TCalculatedTokenCollection = TCalculatedToken[]

export type TCalculatedTokenData = {
  [token: string]: TAmBa,
}

export type TWalletTokensAndBalanceByAddress = {
  balance: number,
  tokens: TCalculatedTokenData[]
}

export type TSelectedToken = {
  symbol: string,
  amount: number,
}

type TSendProps = {
  amount: ?number,
  amountInCurrency: number,
  // currentTokenBalance: number,
  feeMultiplier: number,
  gasFeeAmount: ?number,
  gasFeeAmountInCurrency: ?number,
  onChangeAmount: (amount: string) => void,
  onChangeRecipient: (recipient: string) => void,
  onFeeSliderChange: (value: number) => void,
  onSelectToken: () => void,
  recipient: string,
  selectedCurrency: string,
  selectedToken: ?TSelectedToken,
  // selectedTokenSymbol: ?string,
  walletTokensAndBalance: any,
  selectedWallet: any,
}

type TTokenSelectorProps = {
  onPress: () => void,
  selectedToken: ?TSelectedToken,
}

export default class Send extends PureComponent<TSendProps, {}> {
  // Temporary 
  // eslint-disable-next-line complexity
  render () {
    const {
      amount,
      amountInCurrency,
      // currentTokenBalance,
      feeMultiplier,
      gasFeeAmount,
      gasFeeAmountInCurrency,
      onChangeAmount,
      onChangeRecipient,
      onFeeSliderChange,
      onSelectToken,
      recipient,
      selectedCurrency,
      selectedToken,
      // selectedTokenSymbol,
      selectedWallet,
      walletTokensAndBalance,
    } = this.props

    /* Structure
    walletTokensAndBalance {
      balance: 0,
      isMultisig: false,
      tokens: [{ 'LTC': { amount: 0, balance: 0 } }],
      tokensLength: 0,
      walletMode: null,
    }
    */
    // TODO: [AO] To remove this shame
    const getTokenBalanceBySymbol = (selectedTokenSymbol) => {
      const t = walletTokensAndBalance
        .tokens
        .find( (tokenItem) => {
          return Object.keys(tokenItem)[0] === selectedTokenSymbol
        })
      return t && t[selectedTokenSymbol].balance
    }
    const selectedTokenSymbol: ?string = selectedToken && selectedToken.symbol || null
    const currentTokenBalance = getTokenBalanceBySymbol(selectedTokenSymbol)
    // const currentTokenBalance = walletTokensAndBalance.tokens[selectedTokenSymbol].balance
    const strings = {
      amountInput: `Amount, ${selectedToken.symbol || ''}`,
      walletValue: selectedToken && [ selectedToken.symbol, selectedToken.amount ].join(' '),
      walletTitle: `My ${selectedWallet.blockchain} Wallet`,
      walletBalance: `${selectedCurrency} ${currentTokenBalance && currentTokenBalance.toFixed(2)}`,
      sendBalance: `${selectedCurrency} ${amountInCurrency.toFixed(2)}`,
      advancedFee: 'Advanced Fee',
      scanQr: 'Scan QR code',
    }

    return (
      <ScrollView style={styles.scrollView}>
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
          <TokenSelector
            selectedToken={selectedToken}
            onPress={onSelectToken}
          />
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
            source={require('../images/coin-time-small.png')}
            style={styles.tokenImage}
          />
          <Input
            placeholder='Recipient Address'
            onChangeText={onChangeRecipient}
            value={recipient}
          />
          <Input
            placeholder={strings.amountInput}
            keyboardType='numeric'
            onChangeText={onChangeAmount}
            value={amount != null ? amount.toLocaleString(I18n.currentLocale()) : ''}
          />
          <Text style={styles.sendBalance}>
            {
              strings.sendBalance
            }
          </Text>
          <SectionHeader title='Fee' />
          <FeeSlider
            tokenSymbol={selectedTokenSymbol}
            selectedCurrency={selectedCurrency}
            calculatedFeeValue={gasFeeAmount}
            calculatedFeeValueInSelectedCurrency={gasFeeAmountInCurrency}
            maximumValue={1.9}
            minimumValue={0.1}
            value={feeMultiplier}
            step={0.1}
            handleValueChange={onFeeSliderChange}
          />
          {/*<Text style={styles.advancedFee}>
            {
              strings.advancedFee
            }
          </Text>
          <SectionHeader title='Create template (optional)' />
          <Input placeholder='Template name' />
          <Separator style={styles.separatorLight} />
          <Text style={styles.scanQR}>
            {
              strings.scanQr
            }
          </Text>*/}
        </View>
      </ScrollView>
    )
  }
}

class TokenSelector extends PureComponent<TTokenSelectorProps, {}> {
  render () {
    const {
      onPress,
      selectedToken,
    } = this.props

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
}

class Input extends PureComponent<{}, {}> {
  render () {
    return (<TextInput
      style={styles.textInput}
      placeholderTextColor='#7F7F7F'
      {...this.props}
    />)
  }
}

const styles = StyleSheet.create({
  advancedFee: {
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
    margin: 20,
    marginBottom: 30,
  },
  formBody: {
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingTop: 30,
  },
  formHeader: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  scanQR: {
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
    margin: 20,
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  sendBalance: {
    color: '#7F7F7F',
    fontSize: 12,
    fontWeight: '200',
    marginBottom: 30,
    marginLeft: 20,
  },
  separatorDark: {
    backgroundColor: '#424066',
  },
  separatorLight: {
    backgroundColor: '#707070',
  },
  textInput: {
    borderBottomColor: '#C7C7CC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    fontWeight: '200',
    marginLeft: 20,
    marginVertical: 8,
    paddingVertical: 8,
  },
  tokenImage: {
    alignSelf: 'flex-end',
    height: 64,
    position: 'absolute',
    right: 20,
    top: -32,
    width: 64,
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
  walletAddress: {
    color: '#A3A3CC',
    marginBottom: 30,
    marginHorizontal: 20,
  },
  walletBalance: {
    color: '#A3A3CC',
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 4,
  },
  walletTitle: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 30,
  },
  walletValue: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 30,
  },
})
