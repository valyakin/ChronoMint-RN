/* @flow */
import * as React from 'react'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import List from '../../../components/List/List'
import screenLayout from '../../../utils/screenLayout'
import LoginScreenLayout from '../LoginScreenLayout'
import logger from '../../../utils/logger'
import screens from '../../'
import strings from './strings'

type Props = {
  navigator: {
    push: ({ screen: Object }) => void
  },
  onLogin: () => void
}

class WalletFile extends React.Component<Props, {}> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle,
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
            screen: screens.Login.EnterWalletPassword,
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
    screen: screens.Login.GenerateWallet,
    backButtonTitle: 'Wallet',
  })

  render () {
    return (
      <List
        isDark
        data={[
          {
            key: strings.uploadWallet,
            icon: require('../../../assets/icons/clip.png'),
            hasArrow: true,
            onPress: this.handleUploadWallet,
          },
          {
            key: strings.generateWallet,
            icon: require('../../../assets/icons/wallet.png'),
            hasArrow: true,
            onPress: this.handleGenerateWallet,
          },
        ]}
      />
    )
  }
}

export default screenLayout(LoginScreenLayout)(WalletFile)
