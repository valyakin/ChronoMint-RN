/* @flow */
import React from 'react'
import { List } from '@components'
import strings from './strings'
import screenLayout from '../../screenLayout'
import LoginScreenLayout from '../LoginScreenLayout'
import styles from './styles'

@screenLayout(LoginScreenLayout)
export default class OptionSelector extends React.Component {
  static screenOptions = {
    title: 'Login',
    subtitle: 'Select login options:'
  }

  render () {

    return (
      <List
        itemStyle={styles.listItem}
        theme='dark'
        data={[
          {
            key: 'Mnemonic key',
            icon: require('@icons/mnemonic.png')
          },
          {
            key: 'Wallet file',
            icon: require('@icons/wallet.png')
          },
          {
            key: 'Private key',
            icon: require('@icons/key.png')
          }
        ]}
      />
    )
  }
}
