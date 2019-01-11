/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Mnemonic from 'bitcore-mnemonic-react-native'
import hdKey from 'ethereumjs-wallet/hdkey'
import Accounts from 'web3-eth-accounts'
import Web3 from 'web3'
import { WALLET_HD_PATH } from '../constants'

const getDerivedWalletByPrivateKey = (privateKey, path = WALLET_HD_PATH) => {
  const accounts = new Accounts()
  const wallets = accounts.wallet.create()
  const hdWallet = hdKey.fromMasterSeed(Buffer.from(privateKey, 'hex')).derivePath(path)
  const wallet = hdWallet.getWallet()
  const account = accounts.privateKeyToAccount(wallet.getPrivateKeyString())

  wallets.add(account)
  const newWallet = wallets[0]
  newWallet.path = path

  return newWallet
}

export const generateMnemonic = async () => {
  const mnemonicObject = new Mnemonic(Mnemonic.Words.ENGLISH)
  const phrase = await mnemonicObject.phrase
  return phrase
}

export const decryptWallet = async (entry, password) => {
  const accounts = new Accounts()
  const wallet = await accounts.wallet.decrypt([entry], password)

  return wallet[0]
}

export const mnemonicToPrivateKeyAndAddress = (mnemonic, path = WALLET_HD_PATH) => {
  const accounts = new Accounts()
  const wallets = accounts.wallet.create()
  const mnemonicSeed = new Mnemonic(mnemonic, Mnemonic.Words.ENGLISH).toSeed()
  const hdWallet = hdKey.fromMasterSeed(mnemonicSeed)
  const wallet = hdWallet.derivePath(path).getWallet()
  const account = accounts.privateKeyToAccount(wallet.getPrivateKeyString())
  wallets.add(account)

  const walletAccount = wallets[0]

  return {
    address: walletAccount.address,
    privateKey: walletAccount.privateKey,
  }
}

export const createEthWallet = (privateKey) => {
  const wallet = getDerivedWalletByPrivateKey(privateKey)
  return wallet
}

export const getAddress = (privateKey) => {
  if (!privateKey) {
    throw new Error('0004: Can\'t create ETH wallet without privateKey')
  }

  const wallet = createEthWallet(privateKey)
  return wallet.address
}

export const encryptWallet = async (wallet, password) => {
  // Simplified encryption to speedup decription on mobile devices
  // Original: const encryptWallet = await wallet.encrypt(password)
  const encryptWallet = await wallet.encrypt(password, { n: 128, r: 1, p: 1 })
  return encryptWallet
}

export const checkPrivateKey = (privateKey) => {
  let finalPrivate = privateKey
  if (finalPrivate.slice(0, 2) === '0x') {
    finalPrivate = finalPrivate.slice(2)
  }
  return finalPrivate
}

export const signEthTransaction = ({ tx, privateKey }) => {
  const accounts = new Accounts()
  const signedTx = accounts.signTransaction(tx, privateKey)
  return signedTx
}

export const isValidETHAddress = (address) => Web3.utils.isAddress(address)
