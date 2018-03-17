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
import WalletsList from './WalletsList'

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
  Navigation.registerComponent('WalletsList', () => WalletsList, store, Provider)
}
