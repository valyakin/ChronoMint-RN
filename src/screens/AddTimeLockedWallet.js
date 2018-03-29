/* @flow */
import * as React from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import SectionHeader from '../components/SectionHeader'
import Separator from '../components/Separator'
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
      <View style={styles.screenView}>
        <TextInput
          style={styles.walletName}
          placeholder='Wallet Name'
          placeholderTextColor='#7F7F7F'
        />
        <SectionHeader title='Time lock settings' />
        <View style={styles.selector}>
          <Text style={styles.selectorLabel}>Date:&nbsp;</Text>
          <Text style={styles.selectorValue}>20-02-2018</Text>
          <Image source={require('../images/chevron-down.png')} style={styles.selectorImage} />
        </View>
        <Separator />
        <View style={styles.selector}>
          <Text style={styles.selectorLabel}>Time:&nbsp;</Text>
          <Text style={styles.selectorValue}>10:30 PM</Text>
          <Image source={require('../images/chevron-down.png')} style={styles.selectorImage} />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Make this wallet active for transactions on specific date and time.
          </Text>
        </View>
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
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFF3',
    fontSize: 16,
  },
  selector: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorLabel: {
    color: '#7F7F7F',
    fontSize: 16,
  },
  selectorValue: {
    fontSize: 16,
    fontWeight: '200',
    flex: 1,
  },
  selectorImage: {
    tintColor: '#C7C7CC',
  },
  descriptionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#EFEFF3',
    borderTopColor: '#C7C7CC',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  description: {
    fontSize: 13,
  },
})
