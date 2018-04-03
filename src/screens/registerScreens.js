/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import { Navigation } from 'react-native-navigation'
import screenLayout from '../utils/screenLayout'
import LoginScreenLayout from '../components/LoginScreenLayout'
import AccountPassword from './AccountPassword'
import Add2FAWallet from './Add2FAWallet'
import AddAdvancedWallet from './AddAdvancedWallet'
import AddEthereumWallet from './AddEthereumWallet'
import AddMultiSignatureWallet from './AddMultiSignatureWallet'
import AddStandardWallet from './AddStandardWallet'
import AddTimeLockedWallet from './AddTimeLockedWallet'
import AddTokenToAdvancedWallet from './AddTokenToAdvancedWallet'
import AddWallet from './AddWallet'
import ConfirmMnemonic from './ConfirmMnemonic'
import ConfirmSend from './ConfirmSend'
import CreateWallet from './CreateWallet'
import Download2FAApp from './Download2FAApp'
import Drawer from './Drawer'
import EnterPin from './EnterPin'
import GenerateMnemonic from './GenerateMnemonic'
import SelectAccount from './SelectAccount'
import SelectToken from './SelectToken'
import Send from './Send'
import Wallet from './Wallet'
import WalletBackup from './WalletBackup'
import WalletOwners from './WalletOwners'
import WalletsApp from './WalletsApp'
import WalletsList from './WalletsList'
import WalletTemplates from './WalletTemplates'
import WalletTokens from './WalletTokens'

export default function registerScreens (store, Provider) {
  Navigation.registerComponent('AccountPassword', () => screenLayout(LoginScreenLayout)(AccountPassword), store, Provider)
  Navigation.registerComponent('Add2FAWallet', () => Add2FAWallet, store, Provider)
  Navigation.registerComponent('AddAdvancedWallet', () => AddAdvancedWallet, store, Provider)
  Navigation.registerComponent('AddEthereumWallet', () => AddEthereumWallet, store, Provider)
  Navigation.registerComponent('AddMultiSignatureWallet', () => AddMultiSignatureWallet, store, Provider)
  Navigation.registerComponent('AddStandardWallet', () => AddStandardWallet, store, Provider)
  Navigation.registerComponent('AddTimeLockedWallet', () => AddTimeLockedWallet, store, Provider)
  Navigation.registerComponent('AddTokenToAdvancedWallet', () => AddTokenToAdvancedWallet, store, Provider)
  Navigation.registerComponent('AddWallet', () => AddWallet, store, Provider)
  Navigation.registerComponent('ConfirmMnemonic', () => screenLayout(LoginScreenLayout)(ConfirmMnemonic), store, Provider)
  Navigation.registerComponent('ConfirmSend', () => ConfirmSend, store, Provider)
  Navigation.registerComponent('CreateWallet', () => screenLayout(LoginScreenLayout)(CreateWallet), store, Provider)
  Navigation.registerComponent('Download2FAApp', () => Download2FAApp, store, Provider)
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider)
  Navigation.registerComponent('EnterPin', () => screenLayout(LoginScreenLayout)(EnterPin), store, Provider)
  Navigation.registerComponent('GenerateMnemonic', () => screenLayout(LoginScreenLayout)(GenerateMnemonic), store, Provider)
  Navigation.registerComponent('SelectAccount', () => screenLayout(LoginScreenLayout)(SelectAccount), store, Provider)
  Navigation.registerComponent('SelectToken', () => SelectToken, store, Provider)
  Navigation.registerComponent('Send', () => Send, store, Provider)
  Navigation.registerComponent('Wallet', () => Wallet, store, Provider)
  Navigation.registerComponent('WalletBackup', () => screenLayout(LoginScreenLayout)(WalletBackup), store, Provider)
  Navigation.registerComponent('WalletOwners', () => WalletOwners, store, Provider)
  Navigation.registerComponent('WalletsApp', () => WalletsApp, store, Provider)
  Navigation.registerComponent('WalletsList', () => WalletsList, store, Provider)
  Navigation.registerComponent('WalletTemplates', () => WalletTemplates, store, Provider)
  Navigation.registerComponent('WalletTokens', () => WalletTokens, store, Provider)
}
