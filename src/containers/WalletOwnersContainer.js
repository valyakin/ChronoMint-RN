/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import WalletOwners, { type TOwner } from '../screens/WalletOwners'

class WalletOwnersContainer extends PureComponent<{}, {}> {
  /* eslint-disable-next-line no-unused-vars */
  handleSelectOwner = (owner: TOwner) => () => {
    throw 'Not implemented yet'
  }

  render () {
    return (<WalletOwners
      owners={owners}
      onSelectOwner={this.handleSelectOwner}
    />)
  }
}

export default WalletOwnersContainer

const owners = [
  {
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
    id: '0',
    image: require('../images/profile-circle-small.png'),
    name: 'You',
  },
  {
    address: '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
    id: '1',
    image: require('../images/profile-circle-small.png'),
    name: 'Owner name',
  },
]
