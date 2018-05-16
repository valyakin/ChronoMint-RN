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
import styles from 'components/styles/WalletListItemStyles'
import WalletImage from 'components/WalletImage'

type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}
type TCalculatedToken = TPrices
type TCalculatedTokenCollection = TCalculatedToken[]
export type TWalletsListItemProps = {
  address: string,
  navigator: any,
  selectedCurrency: string,
  blockchain: string,
  onItemPress(): void,
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

  let tokensStrings = Object.keys(tokens)
    .sort()
    .reduce( (accumulator, tokenSymbol) => {
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

export default class WalletsListItem extends PureComponent<TWalletsListItemProps> {

  render () {
    const {
      address,
      onItemPress,
    } = this.props

    // TODO: to optimize (rewrite it)
    let walletTitle = `My ${this.props.blockchain} Wallet`
    // if (wallet.isMultisig()) {
    //   walletTitle = wallet.isTimeLocked() ? 'My TimeLocked Wallet' : 'My Shared wallet'
    // }

    const textCurrencyBalance = [this.props.selectedCurrency, balance].join(' ')

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onItemPress}
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
