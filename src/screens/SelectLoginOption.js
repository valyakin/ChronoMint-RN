/* @flow */
import * as React from 'react'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import Web3 from 'web3'
import mnemonicProvider from '../../mint/packages/login/network/mnemonicProvider'
import networkService from '../../mint/packages/login/network/NetworkService'
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
import privateKeyProvider from '../../mint/packages/login/network/privateKeyProvider'
import walletProvider from '../../mint/packages/login/network/walletProvider'
import List from '../components/List'
import screenLayout from '../utils/screenLayout'
import LoginScreenLayout from './LoginScreenLayout'
import { store } from '../redux/configureStore'

type Props = {
  navigator: {
    push: ({ screen: any }) => void
  },
  addError: (error: any) => void,
  loadAccounts: () => void,
  login: (account: any) => void,
  selectAccount: (value: any) => void,
  clearErrors: () => void,
  createNetworkSession: (account: any, provider: any, network: any) => void,
  selectProvider: (providerId: number) => void,
  checkNetwork: (account: any, provider: any, network: any) => void,
  selectNetwork: (network: number) => void,
  getProviderURL: () => void,
  getProviderSettings: () => void,
  loading: () => void,
  selectedNetworkId: number,
  accounts: any[],
  isLocal: boolean,
  isMetamask: boolean,
  errors: any,
  selectedAccount: any,
  selectedProviderId: any,
  networks: any[]
}

class OptionSelector extends React.Component<Props, {}> {
  static screenOptions = {
    title: I18n.t('SelectLoginOption.login'),
    subtitle: I18n.t('SelectLoginOption.selectOptions'),
    hasFetchingStatus: true,
    hasLogo: true,
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

  handleWallet = () => {
    this.props.navigator.push({
      screen: 'WalletsList',
    })
  }

  handleMnemonicLogin = (mnemonicKey) => {
    this.props.loading()
    this.props.clearErrors()
    const providerSettings = this.props.getProviderSettings()
    const provider = mnemonicProvider.getMnemonicProvider(mnemonicKey, providerSettings)
    this.setupAndLogin(provider)
  }

  handlePrivateKeyLogin = (privateKey) => {
    this.props.loading()
    this.props.clearErrors()
    try {
      const provider = privateKeyProvider.getPrivateKeyProvider(privateKey, networkService.getProviderSettings())
      this.setupAndLogin(provider)
    } catch (e) {
      this.props.addError(e.message)
    }
  }

  handleMnemonicKey = () => this.props.navigator.push({
    screen: 'EnterMnemonic',
    backButtonTitle: 'Login',
    passProps: {
      onLogin: this.handleMnemonicLogin,
    },
  })

  handleWalletFile = () => this.props.navigator.push({
    screen: 'PickWalletFile',
    backButtonTitle: 'Login',
    passProps: {
      onLogin: this.handleWalletUpload,
    },
  })

  handlePrivateKey = () => this.props.navigator.push({
    screen: 'EnterPrivateKey',
    backButtonTitle: 'Login',
    passProps: {
      onLogin: this.handlePrivateKeyLogin,
    },
  })

  handleWalletUpload = (wallet, password) => {
    this.props.loading()
    this.props.clearErrors()
    try {
      const provider = walletProvider.getProvider(wallet, password, networkService.getProviderSettings())
      this.setupAndLogin(provider)
    } catch (e) {
      this.props.addError(e.message)
    }
  }

  handleUPort = () => {

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

  render () {
    return (
      <List
        isDark
        data={[
          {
            key: I18n.t('SelectLoginOption.mnemonicKey'),
            icon: require('../images/mnemonic.png'),
            hasArrow: true,
            onPress: this.handleMnemonicKey,
          },
          {
            key: I18n.t('SelectLoginOption.walletFile'),
            icon: require('../images/wallet.png'),
            hasArrow: true,
            onPress: this.handleWalletFile,
          },
          {
            key: I18n.t('SelectLoginOption.privateKey'),
            icon: require('../images/private-key.png'),
            hasArrow: true,
            onPress: this.handlePrivateKey,
          },
          {
            key: I18n.t('SelectLoginOption.uPort'),
            icon: require('../images/uport.png'),
            hasArrow: true,
            onPress: this.handleUPort,
          },
        ]}
      />
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

const mapDispatchToProps = (dispatch) => ({
  addError: (error) => dispatch(addError(error)),
  loadAccounts: () => networkService.loadAccounts(),
  login: (account) => dispatch(login(account)),
  selectAccount: (value) => networkService.selectAccount(value),
  selectNetwork: (network) => networkService.selectNetwork(network),
  selectProvider: (providerId) => networkService.selectProvider(providerId),
  clearErrors: () => dispatch(clearErrors()),
  createNetworkSession: (account, provider, network) => networkService.createNetworkSession(account, provider, network),
  checkNetwork: () => networkService.checkNetwork(),
  getProviderURL: () => networkService.getProviderURL(),
  getProviderSettings: () => networkService.getProviderSettings(),
  loading: () => dispatch(loading()),
})

export default screenLayout(LoginScreenLayout)(
  connect(mapStateToProps, mapDispatchToProps)(OptionSelector )
)
