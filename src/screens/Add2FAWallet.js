/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import { Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import SectionHeader from '../components/SectionHeader'
import colors from '../utils/colors'

export default class AddTimeLockedWallet extends React.Component {
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
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <SectionHeader title='1. Write down backup code' />
        <Text style={styles.backupCodeDescription}>
        You will need this code to restore App in case of emergencies. We recommend you to store the code on paper and keep it in safe place.
        </Text>
        <Text style={styles.backupCode}>
          UT45KQPOI1VBUI5P
        </Text>
        <SectionHeader title='2. Get SMS code' />
        <Input
          defaultValue='+41'
        />
        <Text style={styles.getSmsCode} >
          Get SMS code
        </Text>
        <SectionHeader title='3. Enter SMS code' />
        <Input />
      </ScrollView>
    )
  }
}

const Input = (props) => (
  <TextInput
    style={styles.textInput}
    placeholderTextColor='#7F7F7F'
    {...props}
  />
)

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C7C7CC',
    marginLeft: 20,
    marginVertical: 8,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '200',
  },
  backupCodeDescription: {
    fontSize: 14,
    margin: 20,
    marginTop: 30,
  },
  backupCode: {
    margin: 20,
    marginBottom: 30,
    fontSize: 16,
    fontWeight: '900',
  },
  getSmsCode: {
    margin: 20,
    marginBottom: 30,
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
  },
})
