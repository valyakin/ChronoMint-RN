/* @flow */
import * as React from 'react'
import List from '../../../components/List/List'
import screenLayout from '../../../utils/screenLayout'
import LoginScreenLayout from '../LoginScreenLayout'
import screens from '../../'
import strings from './strings'

type Props = {
  navigator: {
    push: ({ screen: React.Node }) => void
  }
}

class OptionSelector extends React.Component<Props, {}> {
  static screenOptions = {
    title: strings.login,
    subtitle: strings.selectOptions,
    hasFetchingStatus: true,
    hasLogo: true
  }

  handleMnemonicKey = () => this.props.navigator.push({
    screen: screens.Login.EnterMnemonic,
    backButtonTitle: 'Login'
  })

  handleWalletFile = () => this.props.navigator.push({
    screen: screens.Login.WalletFile,
    backButtonTitle: 'Login'
  })

  handlePrivateKey = () => this.props.navigator.push({
    screen: screens.Login.EnterPrivate,
    backButtonTitle: 'Login'
  })

  handleUPort = () => {

  }

  render () {
    return (
      <List
        isDark
        data={[
          {
            key: strings.mnemonicKey,
            icon: require('../../../assets/icons/mnemonic.png'),
            hasArrow: true,
            onPress: this.handleMnemonicKey
          },
          {
            key: strings.walletFile,
            icon: require('../../../assets/icons/wallet.png'),
            hasArrow: true,
            onPress: this.handleWalletFile
          },
          {
            key: strings.privateKey,
            icon: require('../../../assets/icons/key.png'),
            hasArrow: true,
            onPress: this.handlePrivateKey
          },
          {
            key: strings.uPort,
            icon: require('../../../assets/icons/uport.png'),
            hasArrow: true,
            onPress: this.handleUPort
          }
        ]}
      />
    )
  }
}

export default screenLayout(LoginScreenLayout)(OptionSelector)
