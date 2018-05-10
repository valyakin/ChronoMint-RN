/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import ConfirmMnemonic from '../screens/ConfirmMnemonic'
import { MNEMONIC_LENGTH } from '../utils/globals'

export type TConfirmMnemonicContainerProps = {
  mnemonic: string,
  navigator: any,
  usePinProtection?: boolean,
}

export type TConfirmMnemonicContainerState = {
  mnemonic: Array<string>,
  words: Array<string>,
}

class ConfirmMnemonicContainer extends PureComponent<TConfirmMnemonicContainerProps, TConfirmMnemonicContainerState> {
  constructor (props: TConfirmMnemonicContainerProps) {
    super(props)

    this.state = this.createInitialState()
  }

  handleDone = () => {
    const { usePinProtection, navigator, mnemonic } = this.props
    
    if (mnemonic !== this.state.mnemonic.join(' ')) {
      this.addError(I18n.t('ConfirmMnemonic.wrongMnemonicError'))
      return this.resetState()
    }
    
    navigator.push({
      screen: usePinProtection ? 'EnterPin' : 'WalletsList',
    })
  }
  
  handleWord = (word: string) => () => {
    this.setState(({ words, mnemonic }) => {
      words.splice(words.indexOf(word), 1)
      words.push('emptyWord')
      
      return {
        mnemonic: [...mnemonic, word],
        words: [...words],
      }
    }, () => {
      if (this.state.mnemonic.length === MNEMONIC_LENGTH) {
        this.handleDone()
      }
    })
  }
  
  createInitialState = () => ({
    mnemonic: [],
    words: this.props.mnemonic.split(' ').sort(() => Math.random() - 0.5),
  })

  addError = (error: string) => {
    alert(error)
  }

  resetState = () => {
    this.setState(this.createInitialState())
  }

  render () {
    return (<ConfirmMnemonic
      onDone={this.handleDone}
      onWord={this.handleWord}
      mnemonic={this.state.mnemonic.join(' ')}
      words={this.state.words}
    />)
  }
}

export default ConfirmMnemonicContainer
