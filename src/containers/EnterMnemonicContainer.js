/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import mnemonicProvider from 'login/network/mnemonicProvider'
import { MNEMONIC_LENGTH } from '../utils/globals'
import EnterMnemonic from '../screens/EnterMnemonic'
import withLogin from '../components/withLogin'

export type EnterMnemonicContainerProps = {
  onMnemonicLogin: (mnemonic: string) => void,
}

type EnterMnemonicContainerState = {
  mnemonicWords: Array<string>
}

const inputsList = Array(MNEMONIC_LENGTH).fill(1)

class EnterMnemonicContainer extends PureComponent<EnterMnemonicContainerProps, EnterMnemonicContainerState> {
  state = {
    mnemonicWords: [],
  }

  handleEnterWord = (index: number) => (word: string) => {
    const { mnemonicWords } = this.state
    
    mnemonicWords[index] = word.trim()

    if (/\s+$/.test(word)) {
      (index + 1 === MNEMONIC_LENGTH) ?
        this.handleLogin() :
        this.inputs[index + 1].focus()
    }
    
    this.setState({ mnemonicWords })
  }
  
  handleLogin = () => {
    const mnemonic = this.state.mnemonicWords.join(' ')

    if (!mnemonicProvider.validateMnemonic(mnemonic)) {
      return alert('Incorrect mnemonic. Check it and try again')
    }

    this.props.onMnemonicLogin(mnemonic)
  }

  inputs: Array<any> = []

  refInput = (index: number) => (input: any) => this.inputs[index] = input

  render () {
    return (<EnterMnemonic
      inputsList={inputsList}
      onEnterWord={this.handleEnterWord}
      onLogin={this.handleLogin}
      refInput={this.refInput}
    />)
  }
}

export default withLogin(EnterMnemonicContainer)
