/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { DUCK_MARKET } from 'redux/market/action'
import { DUCK_TOKENS } from 'redux/tokens/actions'
import MainWalletModel from 'models/wallet/MainWalletModel'
import MultisigWalletModel from 'models/wallet/MultisigWalletModel'
import styles from './styles/WalletListItemStyles'
import WalletImage from './WalletImage'

type TMainWalletModel = typeof MainWalletModel
type TMultisigWalletModel = typeof MultisigWalletModel
type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}
type TCalculatedToken = TPrices
type TCalculatedTokenCollection = TCalculatedToken[]
type WalletsListItemProps = {
  wallet: TMainWalletModel | TMultisigWalletModel,
  index: number,
  address: string,
  navigator: any, // TODO: to implement a flow type for navigator
  selectedCurrency: string,
  prices: TPrices,
  sectionName: string,
  tokens: TCalculatedTokenCollection,
  selectWallet(
    wallet: TMainWalletModel,
    address: string,
    blockchainTitle: string
  ): void,
}

const Transactions = ({ transactions }) => !transactions ? null : (
  !transactions[1] ? (
    <Image
      source={require('../images/indicator-receiving-25.png')}
    />
  ) : (
    <View style={styles.transactionsNumberContainer}>
      <Text style={styles.transactionsNumber}>
        {transactions.length}
      </Text>
    </View>
  )
)

const TokensList = ({ tokens }) => {
  if (!tokens || !Object.keys(tokens).length) {
    return null
  }

  let tokensStrings = Object.keys(tokens).sort().reduce( (accumulator, tokenSymbol) => {
    accumulator.push([tokenSymbol, tokens[tokenSymbol].toFixed(2)].join(': '))
    return accumulator
  }, [])

  if (tokensStrings && tokensStrings.length > 2) {
    tokensStrings = [
      tokensStrings[0],
      ['+', tokensStrings.length - 1, 'more'].join(' '),
    ]
  }
  tokensStrings = tokensStrings && tokensStrings.join(', ')

  return (
    <Text style={styles.tokens}>
      {tokensStrings || ''}
    </Text>
  )
}

const Exchange = ({ exchange }) => !exchange ? null : (
  <Text style={styles.exchange}>
    {exchange.currency} {exchange.amount}
  </Text>
)

const mapStateToProps = (state) => {
  const {
    prices,
    selectedCurrency,
  } = state.get(DUCK_MARKET)
  const tokens = state.get(DUCK_TOKENS)

  return {
    prices,
    selectedCurrency,
    tokens,
  }
}

class WalletsListItem extends PureComponent<WalletsListItemProps> {

  handlePress = (tokens: TCalculatedTokenCollection, balance): void => {

    const {
      navigator,
      wallet,
      address,
      sectionName,
    } = this.props
  
    this.props.selectWallet(
      wallet,
      address,
      sectionName,
    )

    navigator.push({
      screen: 'Wallet',
      passProps: {
        wallet: wallet,
        address: address,
        balance: balance,
      },
    })
  }

  render () {
    const {
      wallet,
      address,
    } = this.props

    // const { tokens, balance } = calculateWalletBalance(
    //   this.props.wallet,
    //   this.props.prices,
    //   this.props.tokens,
    //   this.props.selectedCurrency,
    //   this.props.sectionName,
    // )

    // TODO: to optimize (rewrite it)
    let walletTitle = `My ${this.props.sectionName} Wallet`
    if (wallet.isMultisig()) {
      walletTitle = wallet.isTimeLocked() ? 'My TimeLocked Wallet' : 'My Shared wallet'
    }

    const textCurrencyBalance = [this.props.selectedCurrency, balance].join(' ')

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.handlePress(tokens, balance)}
      >

        <View>
          <View style={styles.transactions}>
            <Transactions transactions={wallet.transactions} />
          </View>
          <View style={styles.content}>
            <WalletImage
              image={wallet.image}
              walletMode={wallet.mode}
              style={styles.image}
            />
            <View style={styles.contentColumn}>
              <Text style={styles.title}>
                {
                  walletTitle
                }
              </Text>
              <Text
                style={styles.address}
                ellipsizeMode='middle'
                numberOfLines={1}
              >
                {address}
              </Text>
              <Text style={styles.balance}>
                {
                  textCurrencyBalance
                }
              </Text>
              <TokensList tokens={tokens} />
              {false &&
                <View>
                  <TokensList tokens={wallet.tokens} />
                  <Exchange exchange={wallet.exchange} />
                </View>
              }
            </View>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
}

export default connect(mapStateToProps, null)(WalletsListItem)
