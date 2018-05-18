/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent, type ComponentType } from 'react'
import { Alert } from 'react-native'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import Web3 from 'web3'
import { createDecipher, createHash } from 'crypto'
import { login } from 'redux/session/actions'
import {
  addError,
  clearErrors,
  DUCK_NETWORK,
  loading,
} from 'login/redux/network/actions'
import networkService from 'login/network/NetworkService'
import mnemonicProvider from 'login/network/mnemonicProvider'
import privateKeyProvider from 'login/network/privateKeyProvider'
import web3Provider from 'login/network/Web3Provider'
import { ethereumProvider } from 'login/network/EthereumProvider'
import {
  bccProvider,
  btcProvider,
  btgProvider,
  ltcProvider,
} from 'login/network/BitcoinProvider'
import { nemProvider } from 'login/network/NemProvider'
import startAppRoot from '../app'
import {
  addAccount,
  DUCK_SENSITIVE,
  setPin,
  setUsePinProtection,
} from '../redux/sensitive/actions'
import isValid from '../utils/validators'
import salt from '../utils/salt'

export type LoginHOCProps = {
  accounts: Array<any>,
  addAccount: (account: { address: string, privateKey: string }, password: string) => void,
  addError: (error: string) => void,
  checkNetwork: typeof networkService.checkNetwork,
  children (login: any): any,
  clearErrors (): void,
  createNetworkSession: typeof networkService.createNetworkSession,
  errors: string[],
  getProviderSettings: () => void,
  getProviderURL: () => void,
  loadAccounts: () => void,
  loading: () => void,
  login (account: any): void,
  navigator: any,
  onUsePinProtection (value: boolean): void,
  selectAccount: (account: any) => void,
  selectedAccount: string,
  selectedNetworkId: number,
  selectedProviderId: number,
  selectNetwork: (network: number) => void,
  selectProvider: (providerId: number) => void,
  storedAccounts: any,
  usePinProtection: boolean, 
}

type LoginHOCState = {
  password: string,
}

export default function withLogin (Screen: ComponentType<any>): ComponentType<any> {
  class LoginHOC extends PureComponent<LoginHOCProps, LoginHOCState> {

    state = {
      password: '',
    }
    
    loginSetup = async ({ ethereum, btc, bcc, btg, ltc, nem }) => {
      // setup
      const web3 = new Web3()
      const eProvider = ethereum.getProvider()
  
      web3Provider.setWeb3(web3)
      web3Provider.setProvider(eProvider)
      web3Provider.reinit(web3, eProvider)
      
      // login
      try {
        await this.props.loadAccounts()
        await this.props.selectAccount(this.props.accounts[ 0 ])
        ethereumProvider.setEngine(ethereum, nem)
        bccProvider.setEngine(bcc)
        btcProvider.setEngine(btc)
        btgProvider.setEngine(btg)
        ltcProvider.setEngine(ltc)
        nemProvider.setEngine(nem)

      } catch (e) {

        this.props.addError(e.message)
      }
    }

    onLogin = async () => {
      this.props.clearErrors()
      
      const isPassed = await this.props.checkNetwork()
      
      if (isPassed) {
        this.props.createNetworkSession(
          this.props.selectedAccount,
          this.props.selectedProviderId,
          this.props.selectedNetworkId
        )
        
        await this.props.login(this.props.selectedAccount)

        this.gotoWallet()
      }
    }

    gotoWallet = () => {
      startAppRoot('wallet')
    }

    generateMnemonic = mnemonicProvider.generateMnemonic

    onMnemonicLogin = async (mnemonic: string = mnemonicProvider.generateMnemonic()) => {

      this.props.loading()
      this.props.clearErrors()

      const providerSettings = this.props.getProviderSettings()
      const provider = mnemonicProvider.getMnemonicProvider(mnemonic, providerSettings)

      await this.loginSetup(provider)

      await this.addAccount(provider.ethereum.getPrivateKey())

      return mnemonic
    }

    onPrivateKeyLogin = async (privateKey) => {
      const { storedAccounts } = this.props
      const { password } = this.state

      this.props.loading()
      this.props.clearErrors()

      try {
        const providerSettings = networkService.getProviderSettings()
        const provider = privateKeyProvider.getPrivateKeyProvider(privateKey, providerSettings)

        await this.loginSetup(provider)

        const address = provider.ethereum.getAddress()
        const hasAccount = storedAccounts.has(address)
        const hasPassword = !!password

        if (!hasAccount && hasPassword) {
          await this.addAccount(privateKey)
        }
      } catch (e) {
        this.props.addError(e.message)
      }
    }

    onWalletLogin = async ({ encryptedPrivateKey, passwordHash }, password: string) => {
      try {
        this.props.clearErrors()

        if (!isValid.password(password)) {
          throw('Invalid password')
        }

        const hash = createHash('sha256')
        hash.update(salt(password))

        if (hash.digest('hex') !== passwordHash) {
          throw('Incorrect password')
        }

        const decipher = createDecipher('aes-256-cbc', password)
        let privateKey = decipher.update(encryptedPrivateKey, 'hex', 'utf8')
        privateKey += decipher.final('utf8')
        
        await this.onPrivateKeyLogin(privateKey)
        
        this.onLogin()
      } catch (error) {
        this.props.addError(error)
      }
    }

    onSetPassword = (password: string, passwordConfirmation: string) => 
      new Promise((resolve, reject) => {
        this.props.clearErrors()

        if (password !== passwordConfirmation) {
          reject('Passwords mismatch')
        }
        if (!isValid.password(password)) {
          reject('Invalid password')
        }

        this.setState({ password }, resolve)
      })

    addAccount = async (privateKey: string) => {
      await this.props.addAccount({
        address: this.props.selectedAccount,
        privateKey,
      }, this.state.password)
    }
    
    renderError = (error) => {
      Alert.alert(
        'Error',
        error,
        [
          { text: 'OK', onPress: this.props.clearErrors },
        ],
        { cancelable: false }
      )
    }
    
    render () {

      if (this.props.errors) {
        this.props.errors.forEach(this.renderError)
      }

      const props = {
        ...this.props,
        generateMnemonic: this.generateMnemonic,
        onLogin: this.onLogin,
        onMnemonicLogin: this.onMnemonicLogin,
        onPrivateKeyLogin: this.onPrivateKeyLogin,
        onSetPassword: this.onSetPassword,
        onWalletLogin: this.onWalletLogin,
      }

      return <Screen {...props} />
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginHOC)
}

function mapStateToProps (state: any) {
  const network = state.get(DUCK_NETWORK)
  const sensitive = state.get(DUCK_SENSITIVE)

  return {
    storedAccounts: sensitive.accounts,
    accounts: network.accounts,
    errors: network.errors,
    isLoading: network.isLoading,
    isLocal: network.isLocal,
    isMetamask: network.isMetamask,
    networks: network.networks,
    selectedAccount: network.selectedAccount,
    selectedNetworkId: network.selectedNetworkId,
    selectedProviderId: network.selectedProviderId,
    usePinProtection: sensitive.usePinProtection,
  }
}

function mapDispatchToProps (dispatch: Dispatch<any>) {
  return {
    addError: (error) => dispatch(addError(error)),
    checkNetwork: () => networkService.checkNetwork(),
    clearErrors: () => dispatch(clearErrors()),
    createNetworkSession: (account, provider, network) => networkService.createNetworkSession(account, provider, network),
    getProviderSettings: () => networkService.getProviderSettings(),
    getProviderURL: () => networkService.getProviderURL(),
    loadAccounts: () => networkService.loadAccounts(),
    loading: () => dispatch(loading()),
    login: (account) => dispatch(login(account)),
    onUsePinProtection: (value) => dispatch(setUsePinProtection(value)),
    selectAccount: (value) => networkService.selectAccount(value),
    selectNetwork: (network) => networkService.selectNetwork(network),
    selectProvider: (providerId) => networkService.selectProvider(providerId),
    setUsePinProtection: (value) => dispatch(setUsePinProtection(value)),
    onSetPin: (pin: string) => dispatch(setPin(pin)),
    addAccount: (account, password) => dispatch(addAccount(account, password)),
  }
}

