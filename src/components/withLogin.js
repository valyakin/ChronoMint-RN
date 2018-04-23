/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import Web3 from 'web3'
import { DUCK_SENSITIVE, setUsePinProtection } from 'redux/sensitive/actions'
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

export default function withLogin (Screen: React.ComponentType<any>): React.ComponentType<any> {
  class LoginHOC extends React.Component<LoginHOCProps, LoginHOCState> {
    
    setupAndLogin = async ({ ethereum, btc, bcc, btg, ltc, nem }) => {
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
        await this.login()
      } catch (e) {
        // eslint-disable-next-line
        this.props.addError(e.message)
      }
    }

    login = async () => {
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
      this.props.navigator.push({
        screen: 'WalletsList',
        title: 'My wallets',
      })
    }

    generateMnemonic = mnemonicProvider.generateMnemonic

    onLogin = () => {
      alert('LOGIN')
    }

    onMnemonicLogin = (mnemonic: string) => {
      this.props.loading()
      this.props.clearErrors()
      const providerSettings = this.props.getProviderSettings()
      const provider = mnemonicProvider.getMnemonicProvider(mnemonic, providerSettings)
      this.setupAndLogin(provider)
    }

    onPrivateKeyLogin = (privateKey) => {
      this.props.loading()
      this.props.clearErrors()
      try {
        const provider = privateKeyProvider.getPrivateKeyProvider(privateKey, networkService.getProviderSettings())
        this.setupAndLogin(provider)
      } catch (e) {
        this.props.addError(e.message)
      }
    }
    
    render () {
      const {
        onLogin,
        onMnemonicLogin,
        onPrivateKeyLogin,
        generateMnemonic,
      } = this

      const props = {
        ...this.props,
        onLogin,
        generateMnemonic,
        onMnemonicLogin,
        onPrivateKeyLogin,
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
  }
}

export type LoginHOCProps = {
  getProviderURL: () => void,
  selectNetwork: (network: number) => void,
  selectProvider: (providerId: number) => void,
  accounts: Array<any>,
  addError: (error: string) => void,
  checkNetwork: typeof networkService.checkNetwork,
  children (login: any): any,
  clearErrors (): void,
  createNetworkSession: typeof networkService.createNetworkSession,
  getProviderSettings: () => void,
  loadAccounts: () => void,
  loading: () => void,
  login (account: any): void,
  navigator: any,
  onUsePinProtection (value: boolean): void,
  selectAccount: (account: any) => void,
  selectedAccount: number,
  selectedNetworkId: number,
  selectedProviderId: number,
  usePinProtection: boolean, 
}

type LoginHOCState = {}
