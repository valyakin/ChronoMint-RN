/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import Web3 from 'web3'
import {
  addError,
  clearErrors,
  loading,
  DUCK_NETWORK,
} from '../../mint/packages/login/redux/network/actions'
import {
  bccProvider,
  btcProvider,
  btgProvider,
  ltcProvider,
} from '../../mint/packages/login/network/BitcoinProvider'
import { ethereumProvider } from '../../mint/packages/login/network/EthereumProvider'
import { nemProvider } from '../../mint/packages/login/network/NemProvider'
import { bootstrap, login } from '../redux/session/actions'
import web3Utils from '../../mint/packages/login/network/Web3Utils'
import web3Provider from '../../mint/packages/login/network/Web3Provider'
import networkService from '../../mint/packages/login/network/NetworkService'
import mnemonicProvider from '../../mint/packages/login/network/mnemonicProvider'
import { store } from '../redux/configureStore'
import Input from '../components/Input'
import isValid from '../utils/validators'
import PrimaryButton from '../components/PrimaryButton'
import TextButton from '../components/TextButton'

class CreateWallet extends React.Component<CreateWalletProps, CreateWalletState> {
  static navigatorStyle = {
    navBarHidden: true,
  }

  state = {
    password: '',
    passwordConfirmation: '',
    mnemonic: '',
  }
  
  componentDidMount () {
    window.web3 = Web3

    networkService.connectStore(store)

    store.dispatch(bootstrap()).then(() => {
      this.props.selectProvider(2)
      this.props.selectNetwork(4)
      this.resolveNetwork()
    })
  }

  handleSelectNetwork = () => {
    this.props.navigator.push({
      screen: 'SelectNetwork',
    })
  }

  handleSelectLanguage = () => {
    this.props.navigator.push({
      screen: 'SelectLanguage',
    })
  }

  handleChangePassword = (password: string) => {
    this.setState({ password })
  }

  handleChangePasswordConfirmation = (passwordConfirmation: string) => {
    this.setState({ passwordConfirmation })
  }

  handleCreateWallet = async () => {
    const { password, passwordConfirmation } = this.state

    if (password !== passwordConfirmation) {
      return this.addError(I18n.t('CreateWallet.mismatchPasswords'))
    }
    if (!isValid.password(password) || !isValid.password(passwordConfirmation)) {
      return this.addError(I18n.t('CreateWallet.invalidPassword'))
    }

    const mnemonic = mnemonicProvider.generateMnemonic()

    this.setState({ mnemonic })

    this.props.navigator.push({
      screen: 'WalletBackup',
      passProps: {
        mnemonic: this.state.mnemonic,
        onLogin: this.handleMnemonicLogin,
      },
    })
  }

  handleUseWallet = () => {
    this.props.navigator.push({
      screen: 'SelectAccount',
      title: I18n.t('SelectAccount.title'),
    })
  }

  handleWallet = () => {
    this.props.navigator.push({
      screen: 'WalletsList',
    })
  }

  handleMnemonicLogin = () => {
    this.props.loading()
    this.props.clearErrors()
    const providerSettings = this.props.getProviderSettings()
    const provider = mnemonicProvider.getMnemonicProvider(this.state.mnemonic, providerSettings)
    this.setupAndLogin(provider)
  }

  async handleLogin () {
    this.props.clearErrors()

    const isPassed = await this.props.checkNetwork(
      this.props.selectedAccount,
      this.props.selectedProviderId,
      this.props.selectedNetworkId
    )

    if (isPassed) {
      this.props.createNetworkSession(
        this.props.selectedAccount,
        this.props.selectedProviderId,
        this.props.selectedNetworkId
      )

      await this.props.login(this.props.selectedAccount)

      this.handleWallet()
    }
  }
  
  async setupAndLogin ({ ethereum, btc, bcc, btg, ltc, nem }) {
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
      await this.handleLogin()
    } catch (e) {
      // eslint-disable-next-line
      this.props.addError(e.message)
    }
  }
  
  resolveNetwork = () => {
    const web3 = new Web3()
    web3Provider.setWeb3(web3)
    const providerUrl = this.props.getProviderURL()
    const statusEngine = web3Utils.createStatusEngine(providerUrl)
    web3Provider.setProvider(statusEngine)
    web3Provider.resolve()
  }

  addError = (error: Error) => {
    alert(error)
  }

  render () {
    return (
      <View>
        <View style={styles.topBarActions}>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={this.handleSelectNetwork}
          >
            <Image
              style={styles.topBarButtonImage}
              source={require('../images/ios-gear-outline.png')}
            />
            <Text style={styles.topBarButtonLabel} >Production</Text >
          </TouchableOpacity >
          <View style={styles.spacer} />
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={this.handleSelectLanguage}
          >
            <Text style={styles.topBarButtonLabel} >EN-US</Text >
          </TouchableOpacity >
        </View>
        <Image
          source={require('../images/ChronoWalletIcon.png')}
          style={styles.logo}
        />
        <Image
          source={require('../images/ChronoWalletText.png')}
          style={styles.logoText}
        />
        <Input
          placeholder={I18n.t('CreateWallet.password')}
          style={styles.input}
          secureTextEntry
          onChangeText={this.handleChangePassword}
          autoCorrect={false}
        />
        <Input
          placeholder={I18n.t('CreateWallet.confirmPassword')}
          style={styles.input}
          secureTextEntry
          onChangeText={this.handleChangePasswordConfirmation}
          autoCorrect={false}
        />
        <PrimaryButton
          label={I18n.t('CreateWallet.createWallet').toUpperCase()}
          onPress={this.handleCreateWallet}
        />
        <Text style={styles.or}>
          {I18n.t('CreateWallet.or')}
        </Text>
        <TextButton
          label={I18n.t('CreateWallet.useExistingWallet')}
          onPress={this.handleUseWallet}
        />
        <Text style={styles.copyright}>
          {I18n.t('CreateWallet.copyright')}
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const network = state.get(DUCK_NETWORK)

  return {
    networks: network.networks,
    errors: network.errors,
    selectedAccount: network.selectedAccount,
    selectedProviderId: network.selectedProviderId,
    selectedNetworkId: network.selectedNetworkId,
    isLoading: network.isLoading,
    accounts: network.accounts,
    isLocal: network.isLocal,
    isMetamask: network.isMetamask,
  }
}

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  addError: (error) => dispatch(addError(error)),
  loading: () => dispatch(loading()),
  login: (account) => dispatch(login(account)),
  clearErrors: () => dispatch(clearErrors()),
  checkNetwork: (account, provider, network) => networkService.checkNetwork(account, provider, network),
  loadAccounts: () => networkService.loadAccounts(),
  selectAccount: (value) => networkService.selectAccount(value),
  selectNetwork: (network) => networkService.selectNetwork(network),
  selectProvider: (providerId) => networkService.selectProvider(providerId),
  getProviderSettings: () => networkService.getProviderSettings(),
  createNetworkSession: (account, provider, network) => networkService.createNetworkSession(account, provider, network),
  getProviderURL: () => networkService.getProviderURL(),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet)

type CreateWalletProps = {
  navigator: {
    push: (settings: NavigatorPushSettings) => {}
  },
  selectNetwork: (network: number) => void,
  selectProvider: (provider: number) => void,
  getProviderURL: () => void,
  loadAccounts: () => void,
  selectAccount: (value: any) => void,
  getProviderSettings: () => void,
  addError: (error: string) => void,
  clearErrors: () => void,
  checkNetwork: (account: any, provider: any, network: any) => void,
  createNetworkSession: (account: any, provider: any, network: any) => void,
  loading: () => void,
  login: (account: any) => void,
  accounts: Array<any>,
  selectedAccount: any,
  selectedNetworkId: any,
  selectedProviderId: number,
}

type CreateWalletState = {
  password: string,
  passwordConfirmation: string,
  mnemonic: string,
}

type NavigatorPushSettings = {
  screen: string,
  title?: string
}

const styles = StyleSheet.create({
  topBarButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarActions: {
    flexDirection: 'row',
    margin: 20,
    top: -44,
  },
  spacer: {
    flex: 1,
  },
  topBarButtonImage: {
    tintColor: '#ffffff',
    marginRight: 10,
  },
  topBarButtonLabel: {
    color: '#FFFFFF',
  },
  logo: {
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
  logoText: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    margin: 20,
    textAlign: 'center',
  },
  or: {
    color: '#A3A3CC',
    alignSelf: 'center',
    fontSize: 16,
  },
  copyright: {
    color: '#9997B2',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    marginVertical: 30,
  },
})
