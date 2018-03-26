/* @flow */
import { Navigation } from 'react-native-navigation'
import AddWallet from './AddWallet'
import ChangeLanguage from './ChangeLanguage'
import Drawer from './Drawer'
import EnterMnemonic from './EnterMnemonic'
import EnterPinCode from './EnterPinCode'
import EnterPrivateKey from './EnterPrivateKey'
import EnterWalletPassword from './EnterWalletPassword'
import GenerateMnemonic from './GenerateMnemonic'
import GenerateWalletFile from './GenerateWalletFile'
import LoginSettings from './LoginSettings'
import PickWalletFile from './PickWalletFile'
import SelectLoginOption from './SelectLoginOption'
import SelectNetwork from './SelectNetwork'
import Wallet from './Wallet'
import WalletOwners from './WalletOwners'
import WalletsList from './WalletsList'
import WalletTemplates from './WalletTemplates'
import WalletTokens from './WalletTokens'
import Send from './Send'
import AddStandardWallet from './AddStandardWallet'
import AddTimeLockedWallet from './AddTimeLockedWallet'
import Add2FAWallet from './Add2FAWallet'
import AddMultiSignatureWallet from './AddMultiSignatureWallet'
import AddAdvancedWallet from './AddAdvancedWallet'
import AddTokenToAdvancedWallet from './AddTokenToAdvancedWallet'
import AddEthereumWallet from './AddEthereumWallet'

export default function registerScreens (store, Provider) {
  Navigation.registerComponent('AddWallet', () => AddWallet, store, Provider)
  Navigation.registerComponent('ChangeLanguage', () => ChangeLanguage, store, Provider)
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider)
  Navigation.registerComponent('EnterMnemonic', () => EnterMnemonic, store, Provider)
  Navigation.registerComponent('EnterPinCode', () => EnterPinCode, store, Provider)
  Navigation.registerComponent('EnterPrivateKey', () => EnterPrivateKey, store, Provider)
  Navigation.registerComponent('EnterWalletPassword', () => EnterWalletPassword, store, Provider)
  Navigation.registerComponent('GenerateMnemonic', () => GenerateMnemonic, store, Provider)
  Navigation.registerComponent('GenerateWalletFile', () => GenerateWalletFile, store, Provider)
  Navigation.registerComponent('LoginSettings', () => LoginSettings, store, Provider)
  Navigation.registerComponent('PickWalletFile', () => PickWalletFile, store, Provider)
  Navigation.registerComponent('SelectLoginOption', () => SelectLoginOption, store, Provider)
  Navigation.registerComponent('SelectNetwork', () => SelectNetwork, store, Provider)
  Navigation.registerComponent('Wallet', () => Wallet, store, Provider)
  Navigation.registerComponent('WalletOwners', () => WalletOwners, store, Provider)
  Navigation.registerComponent('WalletsList', () => WalletsList, store, Provider)
  Navigation.registerComponent('WalletTemplates', () => WalletTemplates, store, Provider)
  Navigation.registerComponent('WalletTokens', () => WalletTokens, store, Provider)
  Navigation.registerComponent('Send', () => Send, store, Provider)
  Navigation.registerComponent('AddStandardWallet', () => AddStandardWallet, store, Provider)
  Navigation.registerComponent('AddTimeLockedWallet', () => AddTimeLockedWallet, store, Provider)
  Navigation.registerComponent('Add2FAWallet', () => Add2FAWallet, store, Provider)
  Navigation.registerComponent('AddMultiSignatureWallet', () => AddMultiSignatureWallet, store, Provider)
  Navigation.registerComponent('AddAdvancedWallet', () => AddAdvancedWallet, store, Provider)
  Navigation.registerComponent('AddTokenToAdvancedWallet', () => AddTokenToAdvancedWallet, store, Provider)
  Navigation.registerComponent('AddEthereumWallet', () => AddEthereumWallet, store, Provider)
}
