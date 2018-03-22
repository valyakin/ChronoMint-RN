/* @flow */
import * as React from 'react'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import I18n from 'react-native-i18n'
import RNFS from 'react-native-fs'
import List from '../components/List'
import screenLayout from '../utils/screenLayout'
import LoginScreenLayout from './LoginScreenLayout'
import logger from '../utils/logger'
import images from '../assets/images'

type Props = {
  navigator: {
    push: ({ screen: Object }) => void
  },
  onLogin: () => void
}

class WalletFile extends React.Component<Props, {}> {
  static screenOptions = {
    title: I18n.t('PickWalletFile.title'),
    subtitle: I18n.t('PickWalletFile.subtitle'),
    hasLogo: false,
  }

  handleUploadWallet = () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
      },
      (err, { uri, fileName }) => {
        if (err) {
          logger.error(err)
          
          return
        }
        RNFS.readFile(uri).then((wallet) => {
          this.props.navigator.push({
            screen: 'EnterWalletPassword',
            backButtonTitle: 'Wallet',
            passProps: {
              wallet,
              walletFileName: fileName,
              onLogin: this.props.onLogin,
            },
          })
        })
      }
    )
  }

  handleGenerateWallet = () => this.props.navigator.push({
    screen: 'GenerateWalletFile',
    backButtonTitle: 'Wallet',
  })

  render () {
    return (
      <List
        isDark
        data={[
          {
            key: I18n.t('PickWalletFile.pickWalletFile'),
            icon: images.paperclip,
            hasArrow: true,
            onPress: this.handleUploadWallet,
          },
          {
            key: I18n.t('PickWalletFile.generateWalletFile'),
            icon: images.wallet,
            hasArrow: true,
            onPress: this.handleGenerateWallet,
          },
        ]}
      />
    )
  }
}

export default screenLayout(LoginScreenLayout)(WalletFile)
