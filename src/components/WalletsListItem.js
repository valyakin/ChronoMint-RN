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
import TokensListContainer, { type TokenInfo } from 'containers/TokensListContainer'
import WalletBalanceContainer from 'containers/WalletBalanceContainer'
import isNumber from 'utils/numeric'

type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}
type TCalculatedToken = TPrices[]
export type TCalculatedTokenCollection = TCalculatedToken[]
export type TWalletsListItemProps = {
  address: string,
  blockchain: string,
  selectedCurrency: string,
  onItemPress(): void,
}

const Transactions = ({ transactions }) => !transactions ? null : (
  !transactions[1] ? (
    <Image
      source={require('../images/indicator-receiving-0.png')}
    />
  ) : (
    <View style={styles.transactionsNumberContainer}>
      <Text style={styles.transactionsNumber}>
        {transactions.length}
      </Text>
    </View>
  )
)

type TTokensListProps = {
  list: TokenInfo[],
}
class TokensList extends PureComponent<TTokensListProps> {

  static getDetailedToken = (tokenInfo: TokenInfo): string => {
    const symbol: ?string = Object.keys(tokenInfo)[0]
    const amount: ?number = Object.values(tokenInfo)[0]
    const formattedAmount = isNumber(amount)
      ? amount.toFixed(2)
      : '-.--'
    return [symbol || '', formattedAmount].join(': ')
  }

  static getFormattedTokenslList = (list: TokenInfo[]): string => {
    const [firstToken, secondToken, ...restTokens] = list
    let tokensString = ''

    if (firstToken) {
      tokensString = TokensList.getDetailedToken(firstToken)
      if (secondToken && restTokens.length) {
        tokensString = [tokensString, '+', restTokens.length, 'more'].join(' ')
      }
      if (secondToken && !restTokens.length) {
        tokensString = [tokensString, TokensList.getDetailedToken(secondToken)].join(' ')
      }
    }
    return tokensString
  }

  render () {
    return (
      <Text style={styles.tokens}>
        {
          TokensList.getFormattedTokenslList(this.props.list)
        }
      </Text>
    )
  }
}

type TWalletBlanaceProps = {
  balance: ?number,
  selectedCurrency: string,
}
class WalletBalance extends PureComponent<TWalletBlanaceProps> {

  static getFormattedBalance = (balance: ?number) => isNumber(balance)
    ? balance.toFixed(2)
    : '-.--'

  render () {
    return (
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          {
            this.props.selectedCurrency
          }
        </Text>
        <Text style={[styles.balanceText, styles.balanceNumber]}>
          {
            WalletBalance.getFormattedBalance(this.props.balance)
          }
        </Text>
      </View>
    )
  }
} 

export default class WalletsListItem extends PureComponent<TWalletsListItemProps> {

  constructor (props: TWalletsListItemProps) {
    super(props)
  }

  handleOnPress = () => {
    this.props.onItemPress()
  }

  static renderTokensList = (list: TokenInfo[]) => {
    return <TokensList list={list} />
  }

  static renderWalletBalance = (selectedCurrency: string) => (balance: ?number) => {
    return (
      <WalletBalance
        balance={balance}
        selectedCurrency={selectedCurrency}
      />
    )
  }

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
    } = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleOnPress}
      >
        <View>
          <View style={styles.transactions}>
            <Transactions transactions={[1]} />
          </View>
          <View style={styles.content}>
            <WalletImage
              blockchain={blockchain}
              style={styles.image}
            />
            <View style={styles.contentColumn}>
              <Text style={styles.title}>
                {
                  `My ${blockchain} Wallet`
                }
              </Text>
              <Text
                style={styles.address}
                ellipsizeMode='middle'
                numberOfLines={1}
              >
                {
                  address
                }
              </Text>
              <WalletBalanceContainer
                blockchain={blockchain}
                render={WalletsListItem.renderWalletBalance(selectedCurrency)}
              />
              <TokensListContainer
                blockchain={blockchain}
                render={WalletsListItem.renderTokensList}
              />
              {/* TEMPORARY DISABLED
                <View>
                  <Exchange exchange={wallet.exchange} />
                </View>
              */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
