/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import EnterPrivateKey from '../screens/EnterPrivateKey'
import withLogin from '../components/withLogin'

export type EnterPrivateKeyContainerProps = {
  onPrivateKeyLogin: (privateKey: string) => void,
}

type EnterPrivateKeyContainerState = {
  privateKey: string,
}

class EnterPrivateKeyContainer extends PureComponent<EnterPrivateKeyContainerProps, EnterPrivateKeyContainerState> {
  state = {
    privateKey: '',
  }

  handleChangePrivateKey = (privateKey: string) => {
    this.setState({ privateKey })
  }

  handleDone = () => {
    this.props.onPrivateKeyLogin(this.state.privateKey)
  }

  render () {
    return (<EnterPrivateKey
      onChangePrivateKey={this.handleChangePrivateKey}
      onDone={this.handleDone}
    />)
  }
}

export default withLogin(EnterPrivateKeyContainer)
