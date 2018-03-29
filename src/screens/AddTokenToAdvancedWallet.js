/* @flow */
import * as React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export default class AddTokenToAdvancedWallet extends React.Component {
  // noinspection JSUnusedGlobalSymbols
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel',
        id: 'cancel',
      },
    ],
    rightButtons: [
      {
        title: 'Add',
        id: 'add',
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
    if (type === 'NavBarButtonPress' && id === 'addWallet') {
      alert('Token Added')
    }
  }

  render () {
    return (
      <View style={styles.screenView}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Token Name'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Address'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Abbreviation: 
          </Text>
          <TextInput
            placeholder='ex. BTC'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Smallest unit: 
          </Text>
          <TextInput
            placeholder='ex. 0.0001'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Project URL: 
          </Text>
          <TextInput
            defaultValue='http://www.'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.spacer} />
        <View style={styles.bottomAction}>
          <Text style={styles.bottomActionText}>Upload Logo</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenView: {
    backgroundColor: colors.background,
    paddingTop: 20,
    flex: 1,
  },
  spacer: { flex: 1 },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  inputLabel: {
    color: '#7F7F7F',
    marginRight: 5,
  },
  bottomAction: {
    backgroundColor: '#F7F7F7',
    borderTopColor: '#707070',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bottomActionText: {
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
  },
})
