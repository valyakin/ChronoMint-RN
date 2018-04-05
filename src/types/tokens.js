/* @flow */
import TokenModel from '../../mint/src/models/tokens/TokenModel'
import TokensCollection from '../../mint/src/models/tokens/TokensCollection'
/**
 * Token deatils
 * 
 * id - usually equal to 'sumbol', but it can be anything
 * amount - amount of specified token
 */
export type TToken = {
  amount: number,
  id: string,
}

/**
 * List of all available tokens (like ETH, TIME, XEM etc.)
 */
export type TTokenList = TToken[]

export type TTokenModel = typeof TokenModel
export type TTokensCollection = typeof TokensCollection

