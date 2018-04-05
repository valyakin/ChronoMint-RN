/* @flow */

import MainWalletModel from '../../mint/src/models/wallet/MainWalletModel'
import MultisigWalletModel from '../../mint/src/models/wallet/MultisigWalletModel'

import { type TTokenList } from './tokens'
import { type TTransactionList } from './transactions'
import { type TBalance } from './balances'
import { type TExchange } from './exchanges'

/**
 * Multisig wallet modes
 * 
 * 2fa - A wallet has Two Factor Authentication
 * shared - A wallet is shared with other owners
 * timeLocked - A wallet is locked till %time%
 */
export type TWalletMode = '2fa' | 'shared' | 'timeLocked'

/**
 * Type represented a wallet (main or multisig) for a section on WalletList page
 */
export type TWallet = {
  address: string,
  balance: TBalance,
  exchange?: TExchange,
  image?: number,
  mode?: TWalletMode,
  title: string,
  tokens?: TTokenList,
  transactions?: TTransactionList,
}

/**
 * List of wllets in a section on WalletsList page
 */
export type TWalletList = TWallet[]

/**
 * Section for a sections lost of WalletList page
 */
export type TWalletSection = {
  data: TWalletList,
  title: string,
}

/**
 * List of sections of WalletList page
 */
export type TWalletSectionList = TWalletSection[]

/**
 * Main wallet type from MainWalletModel 
 */
export type TMainWalletModel = typeof MainWalletModel

/**
 * Array of TMainWalletModel
 */
export type TMainWalletModelList = TMainWalletModel[]

/**
 * Multisig wallet type from MultisigWalletModel 
 */
export type TMultisigWalletModel = typeof MultisigWalletModel

/**
 * Array of TMultisigWalletModel
 */
export type TMultisigWalletModelList = TMultisigWalletModel[]

/**
 * Set of Multisig wallets
 * 
 * msWallet - Multisig wallet as is
 * msActiveWallets - Active Multisig wallets
 * msTimelockedWallets - Timelocked Multisig wallets
 */
export type TMultisigWalletsModelsSet = {
  msWallet: TMultisigWalletModel,
  msActiveWallets: TMultisigWalletModelList,
  msTimelockedWallets: TMultisigWalletModelList,
}
