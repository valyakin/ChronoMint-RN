/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import EnterPin from '../screens/EnterPin'
import withLogin from '../components/withLogin'
import { PIN_LENGTH } from '../utils/globals'

export type TEnterPinContainerProps = {
  navigator: any,
  pin: string,
  onMnemonicLogin: (mnemonic: string) => void,
  mnemonic: string,
  onLogin: () => void,
}

type TEnterPinContainerState = {
  pin: string,
}

class EnterPinContainer extends PureComponent<TEnterPinContainerProps, TEnterPinContainerState> {
  state = {
    pin: '',
  }

  handleChangePin = (pin: string) => {
    this.setState({ pin: pin.trim() })

    if (pin.length < PIN_LENGTH) return

    if (!this.props.pin) return this.gotoConfirmPin(pin)

    if (this.props.pin === pin) return this.handleLogin()

    alert(I18n.t('EnterPin.pinsNotMatch'))
  }

  handleLogin = () => {
    this.props.onMnemonicLogin(this.props.mnemonic)
  }

  gotoConfirmPin = (pin) => {
    this.props.navigator.push({
      screen: 'EnterPin',
      title: I18n.t('EnterPin.confirmTitle'),
      passProps: {
        pin,
        onLogin: this.props.onLogin,
      },
    })
  }

  render () {
    return (<EnterPin
      onChangePin={this.handleChangePin}
      pinDigitsFilledCount={this.state.pin.length}
      pinDigitsTotalCount={PIN_LENGTH}
    />)
  }
}

export default withLogin(EnterPinContainer)
