/* @flow */
import * as React from 'react'
import { Text, ScrollView, StyleSheet, Image } from 'react-native'
import colors from '../utils/colors'
import images from '../assets/images'

export default class AddTimeLockedWallet extends React.Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel',
        id: 'cancel',
      },
    ],
    rightButtons: [
      {
        title: 'Proceed',
        id: 'proceed',
      },
    ],
  }
  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <Image source={images.twoFA} />
        <Text style={styles.header}>
          Download App to enable two-factor authentication
        </Text>
        <Text style={styles.text}>
          2FA provides an additional security level for your wallet by generating one-time code in your mobile App for the wallet login and transaction operations.
        </Text>
        <Text style={styles.text}>
          Enable 2FA if you do not plan to have more than 1 owner for the wallet.
        </Text>
        <Text style={styles.text}>
          Install <Text style={styles.bold}>Google Authenticator</Text>  with the link provided below and then tap Proceed.
        </Text>
        <Image source={images.appStore} style={styles.appStore} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    fontSize: 17,
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'stretch',
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    fontWeight: '200',
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'stretch',
  },
  bold: {
    fontWeight: '700',
  },
  appStore: {
    marginTop: 30,
  },
})
