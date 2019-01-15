/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { createAccountByMnemonic } from '@chronobank/ethereum/redux/thunks'
import { getEthAccountList } from '@chronobank/ethereum/redux/selectors'
import i18n from '../../../locales/translation'
import ConfirmMnemonic from './ConfirmMnemonic'

const mapStateToProps = (state) => {
  return {
    accounts: getEthAccountList(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createAccountByMnemonic,
}, dispatch)

class ConfirmMnemonicContainer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = this.createInitialState()
  }

  handleClear = () => {
    this.resetState()
  }

  handleUndo = () => {
    const { words, mnemonic } = this.state
    const [lastStep] = this.state.prevSteps.slice(-1)
    if (lastStep && words != lastStep.words && mnemonic !== lastStep.mnemonic && this.state.prevSteps.length) {
      const newprevSteps = [...this.state.prevSteps]
      newprevSteps.pop()
      this.setState({
        words: lastStep.words,
        mnemonic: lastStep.mnemonic,
        randomWords: lastStep.randomWords,
        prevSteps: newprevSteps,
      }, () => {
        if (this.state.mnemonic.length === 0) {
          this.setState({ disabled: true })
        }
      })
    }
  }

  handleRandomMnemonicElements = (words) => {
    const randWordsArray = []
    while (randWordsArray.length < 3) {
      const randElem = words[Math.floor(Math.random() * words.length)]
      const elemPos = randWordsArray.findIndex((item) => item.word === randElem)
      if ( elemPos === -1) {
        randWordsArray.push({
          word: randElem,
          index: words.indexOf(randElem),
        })
      }
    }
    if (randWordsArray.length === 3) {
      return randWordsArray
    }
  }

  handleShowError = () => {
    Alert.alert(i18n.t('ConfirmMnemonic.wrongMnemonicError'))
    return this.resetState()
  }

  handleDone = (skip) => {
    const {
      mnemonic,
      password,
    } = this.props.navigation.state.params
    const {
      createAccountByMnemonic,
    } = this.props
    const { randomWords } = this.state
    if (skip !== true && randomWords.length !== 0) {
      return this.handleShowError()
    }

    createAccountByMnemonic(mnemonic, password)
      .then(() => {
        this.navigateToStartPage()
      })
      .catch((error) => {
        Alert.alert(error)
      })
  }

  handleSkip = () => {
    this.handleDone(true) // if we would have some validation in handleDone so we could send skip parameter from here
  }

  navigateToStartPage () {
    const {
      navigation,
      accounts,
    } = this.props
    const [account] = accounts.slice(-1)
    const params = account ? { account } : null
    const page = params ? 'Login' : 'Start'
    navigation.navigate(page, params)
  }

  handleWord = (word) => {
    if (word) {
      const { mnemonic, words, disabled, prevSteps } = this.state
      const randomWords = [...this.state.randomWords]
      if (disabled) {
        this.setState({ disabled: false })
      }
      const newWords = [...words]
      newWords[newWords.indexOf(word)] = ''
      randomWords.pop()
      this.setState({
        prevSteps: [...prevSteps, { mnemonic, words, randomWords: this.state.randomWords }],
        mnemonic: [...mnemonic, word],
        words: [...newWords],
        randomWords,
      }, () => {
        if(this.state.randomWords.length === 0 ){
          const mnemonicArr = [...this.state.mnemonic].reverse().join(',')
          const defaultWordsArr = [...this.state.defaultWords].map((item) => item.word).join(',')
          if (mnemonicArr === defaultWordsArr ) {
            this.handleDone()
          }else {
            this.handleShowError()
          }
        }
      })
    }
  }

  createInitialState = () => {
    const { mnemonic } = this.props.navigation.state.params
    const words = mnemonic.split(' ').sort(() => Math.random() - 0.5)
    const randomWords = this.handleRandomMnemonicElements(mnemonic.split(' '))
    return {
      prevSteps: [],
      disabled: true,
      mnemonic: [],
      randomWords,
      defaultWords: randomWords,
      words,
    }
  }

  resetState = () => {
    this.setState(this.createInitialState())
  }

  render () {
    const { words, mnemonic, disabled, randomWords, defaultWords } = this.state
    const lastRandomWord = defaultWords[randomWords.length-1]
    return (
      <ConfirmMnemonic
        onDone={this.handleDone}
        onClear={this.handleClear}
        onUndo={this.handleUndo}
        onWord={this.handleWord}
        onSkip={this.handleSkip}
        mnemonic={mnemonic}
        words={words}
        lastRandomWordIndex={lastRandomWord && lastRandomWord.index + 1}
        disabled={disabled}
      />
    )
  }
}

ConfirmMnemonicContainer.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })),
  createAccountByMnemonic: PropTypes.func,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        mnemonic: PropTypes.string,
        password: PropTypes.string,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMnemonicContainer)
