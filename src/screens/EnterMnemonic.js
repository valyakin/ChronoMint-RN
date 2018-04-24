/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { MNEMONIC_LENGTH } from 'utils/globals'
import Input from 'components/Input'
import mnemonicProvider from 'login/network/mnemonicProvider'
import PrimaryButton from 'components/PrimaryButton'
import withLogin from 'components/withLogin'

const emptyMnemonic = Array(MNEMONIC_LENGTH).fill(1)

class EnterMnemonic extends React.Component<EnterMnemonicProps, EnterMnemonicState> {

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

  keyExtractor = (item: null, index: number) => index.toString()

  refInput = (index: number) => (input: any) => this.inputs[index] = input

  renderItem = ({ index }: { index: number }) => (
    <Input
      style={styles.input}
      ref={this.refInput(index)}
      placeholder={`word ${index + 1}`}
      onChangeText={this.handleEnterWord(index)}
      autoCapitalize='none'
      autoCorrect={false}
    />
  )

  render () {
    return (
      <View style={styles.screenView}>
        <FlatList
          data={emptyMnemonic}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          numColumns={4}
        />
        <PrimaryButton
          label='Log in'
          onPress={this.handleLogin}
        />
      </View>
    )
  }
}

export default withLogin(EnterMnemonic)

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 60,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 20,
  },
})

type EnterMnemonicProps = {
  onMnemonicLogin (mnemonic: string): void
}

type EnterMnemonicState = {
  mnemonicWords: Array<string>,
}
