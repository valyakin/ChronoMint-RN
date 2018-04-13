/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import withLogin from '../components/withLogin'

class EnterPrivateKey extends React.Component<EnterPrivateKeyProps, EnterPrivateKeyState> {

  state = {
    privateKey: '',
  }

  handlePrivateKey = (privateKey: string) => {
    this.setState({ privateKey })
  }

  handleAddAccount = () => {
    this.props.onPrivateKeyLogin(this.state.privateKey)
  }

  render () {
    return (
      <View style={styles.screenView}>
        <Input
          label='Private key'
          onChangeText={this.handlePrivateKey}
        />
        <PrimaryButton
          label='Add account'
          onPress={this.handleAddAccount}
        />
      </View>
    )
  }
}

export default withLogin(EnterPrivateKey)

const styles = StyleSheet.create({
  screenView: {
    margin: 20,
  },
})

type EnterPrivateKeyProps = {
  onPrivateKeyLogin: (privateKey: string) => void
}

type EnterPrivateKeyState = {
  privateKey: string,
}
