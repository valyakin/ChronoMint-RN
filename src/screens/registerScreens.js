/* @flow */
import { Navigation } from 'react-native-navigation'
import SelectLoginOption from './SelectLoginOption'
import LoginSettings from './LoginSettings'
import SelectNetwork from './SelectNetwork'
import ChangeLanguage from './ChangeLanguage'
import EnterMnemonic from './EnterMnemonic'
import GenerateMnemonic from './GenerateMnemonic'
import PickWalletFile from './PickWalletFile'
import EnterWalletPassword from './EnterWalletPassword'
import GenerateWalletFile from './GenerateWalletFile'
import EnterPinCode from './EnterPinCode'
import EnterPrivateKey from './EnterPrivateKey'
import WalletsList from './WalletsList'
import Drawer from './Drawer'

export default function registerScreens (store, Provider) {
  Navigation.registerComponent('SelectLoginOption', () => SelectLoginOption, store, Provider)
  Navigation.registerComponent('LoginSettings', () => LoginSettings, store, Provider)
  Navigation.registerComponent('SelectNetwork', () => SelectNetwork, store, Provider)
  Navigation.registerComponent('ChangeLanguage', () => ChangeLanguage, store, Provider)
  Navigation.registerComponent('EnterMnemonic', () => EnterMnemonic, store, Provider)
  Navigation.registerComponent('GenerateMnemonic', () => GenerateMnemonic, store, Provider)
  Navigation.registerComponent('PickWalletFile', () => PickWalletFile, store, Provider)
  Navigation.registerComponent('EnterWalletPassword', () => EnterWalletPassword, store, Provider)
  Navigation.registerComponent('GenerateWalletFile', () => GenerateWalletFile, store, Provider)
  Navigation.registerComponent('EnterPinCode', () => EnterPinCode, store, Provider)
  Navigation.registerComponent('EnterPrivateKey', () => EnterPrivateKey, store, Provider)
  Navigation.registerComponent('WalletsList', () => WalletsList, store, Provider)
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider)
}
