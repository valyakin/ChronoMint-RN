/* @flow */
import * as React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import colors from '../utils/colors'

export default class AddStandardWallet extends React.Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel',
        id: 'cancel',
      },
    ],
    rightButtons: [
      {
        title: 'Done',
        id: 'done',
      },
    ],
  }

  constructor (props) {
    super(props)

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }
  
  handleNavigatorEvent = ({ type, id }) => {
    if (type === 'NavBarButtonPress' && id === 'cancel') {
      this.props.navigator.pop()
    }
  }
  
  render () {
    return (
      <View style={styles.screenView}>
        <TextInput
          style={styles.walletName}
          placeholder='Wallet Name'
          placeholderTextColor='#7F7F7F'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 10,
  },
  walletName: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFF3',
    fontSize: 16,
  },
})
