/* @flow */
import * as React from 'react'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import List from '../../../components/List/List'
import screenLayout from '../../../utils/screenLayout'
import LoginScreenLayout from '../LoginScreenLayout'
import screens from '../../'
import strings from './strings'

type Props = {
  navigator: {
    push: ({ screen: Object }) => void
  }
}

class OptionSelector extends React.Component<Props, {}> {
  static screenOptions = {
    title: strings.title,
    subtitle: strings.subtitle,
    hasLogo: false
  }

  handleUploadWallet = () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (err, res) => {
        err && console.error(err)
        console.log(res)
      }
    )
  }

  handleGenerateWallet = () => this.props.navigator.push({
    screen: screens.Login.GenerateWallet,
    backButtonTitle: 'Wallet'
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
            onPress: this.handleUploadWallet
          },
          {
            key: strings.generateWallet,
            icon: require('../../../assets/icons/wallet.png'),
            hasArrow: true,
            onPress: this.handleGenerateWallet
          }
        ]}
      />
    )
  }
}

export default screenLayout(LoginScreenLayout)(OptionSelector)
