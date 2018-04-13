/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
/* eslint-disable import/prefer-default-export */

// [Alexey Ozerov] Probably it should be a selector
export const calculateWalletBalance = (
  wallet,
  prices,
  tokens,
  selectedCurrency,
  sectionName,
) => {
  let res = {}
  let finalBalance = 0

  const filterBalancesByBlockchainName = (balanceItem) => {
    const bSymbol = balanceItem.symbol()
    const bToken = tokens.item(bSymbol)
    return bToken.blockchain() === sectionName
  }

  const filteredWalletBalancesItems = wallet.balances().items().filter(filterBalancesByBlockchainName)

  const convertAmountToNumber = (symbol, amount) =>
    tokens
      .item(symbol)
      .removeDecimals(amount)
      .toNumber()

  filteredWalletBalancesItems
    .map( (balance) => {
      const bAmount = balance.amount()
      const bSymbol = balance.symbol()
      const tAmount = convertAmountToNumber(bSymbol, bAmount)

      res[bSymbol] = tAmount
      const tokenPrice = prices[ bSymbol ] && prices[ bSymbol ][ selectedCurrency ] || null
      if (tokenPrice && tAmount > 0) {
        finalBalance += (tAmount * tokenPrice)
      }
    })

  return {
    tokens: res,
    balance: finalBalance.toFixed(2),
  }
}
