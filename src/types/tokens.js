/* @flow */
import TokenModel from '../../mint/src/models/tokens/TokenModel'
import TokensCollection from '../../mint/src/models/tokens/TokensCollection'

/**
 * Pure object representation of a TTokenModel
 * @type {object}
 * @prop {number} amount - Amount of specified token.
 * @prop {string} id -Usually equal to 'sumbol', but it can be anything.
 */
export type TToken = {
  /**
   * @prop {number} amount - Amount of specified token.
   */
  amount: number,
  id: string,
}

/**
 * Alias to TToken[] - list of all available tokens
 * @type {object}
 * @prop {number} amount - Amount of specified token.
 * @prop {string} id -Usually equal to 'sumbol', but it can be anything.
 */
export type TTokenList = TToken[]

export type TTokenModel = typeof TokenModel
export type TTokensCollection = typeof TokensCollection

