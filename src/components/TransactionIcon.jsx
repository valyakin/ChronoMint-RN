import React, { PureComponent } from 'react'
import {
  Image,
} from 'react-native'

const transIcons = {
  'sending': [
    require('../images/sending-0-circle-small.png'),
    require('../images/sending-25-circle-small.png'),
    require('../images/sending-50-circle-small.png'),
    require('../images/sending-75-circle-small.png'),
    require('../images/sending-100-circle-small.png'),
  ],
  'receiving': [
    require('../images/receiving-0-circle-small.png'),
    require('../images/receiving-25-circle-small.png'),
    require('../images/receiving-50-circle-small.png'),
    require('../images/receiving-75-circle-small.png'),
    require('../images/receiving-100-circle-small.png'),
  ],
}

export type TTransactionType = 'receiving' | 'sending'

export type TTransactionIconProps = {
  confiramtions: number,
  type: TTransactionType,
}

class TransactionIcon extends PureComponent<TTransactionIconProps> {

  static getTIcon = (type: TTransactionType, confirmations: number) => {
    if (confirmations >= 4) {
      return transIcons[type][4]
    } else {
      return transIcons[type][confirmations]
    }
  }

  render () {
    return (
      <Image
        source={TransactionIcon.getTIcon(this.props.type, this.props.confirmations)}
      />
    )
  }

}

export default TransactionIcon
