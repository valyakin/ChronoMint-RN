/* @flow */
import * as React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native'
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

  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <WalletOwner {...item} /> 

  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <TextInput
          placeholderTextColor='#7F7F7F'
          placeholder='Wallet name'
          style={styles.walletName}
        />
        <SectionHeader title='Wallet owners' />
        <FlatList
          style={styles.walletOwnerList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={Separator}
          data={walletOwners}
          scrollEnabled={false}
        />
        <Separator />
        <View style={styles.addAddress} >
          <View style={styles.plusButtonRound}>
            <Image
              source={require('../images/plus.png')}
              style={styles.plusButtonRoundImage}
            />
          </View>
          <TextInput
            placeholderTextColor='#7F7F7F'
            placeholder={`Enter owner's Ethereum address`}
            style={styles.addAddressInput}
          />
        </View>
        <View style={styles.ownersWarning}>
          <Text style={styles.ownersWarningText}>
            The wallet need at least 2 owners.
          </Text>
        </View>
        <SectionHeader
          title='Number of signatures required'
          style={styles.numberOfSignaturesHeader}
        />
        <View style={styles.numberOfSignaturesContainer}>
          <Text style={styles.numberOfSignatures}>2</Text>
          <View style={styles.numberControlButtonLeft}>
            <Text style={styles.numberControlTextLeft}>-</Text>
          </View>
          <View style={styles.numberControlButtonRight}>
            <Text style={styles.numberControlTextRight}>+</Text>
          </View>
        </View>
        <View style={styles.ownersWarning}>
          <Text style={styles.ownersWarningText}>
            Specify number of owners’ signatures required to perform a transaction using the wallet.
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const WalletOwner = ({ name, address, image }) => (
  <View style={styles.walletOwner}>
    { (typeof image !== 'undefined') && (
      <Image source={image} style={styles.walletOwnerImage} />
    )}
    <View style={styles.walletOwnerContent}>
      <Text style={styles.walletOwnerName}>
        {name}
      </Text>
      <Text>
        {address}
      </Text>
    </View>
  </View>
)

const walletOwners = [
  {
    id: 'you',
    name: 'You',
    address: '0x19e7e376e7c213b7e7e7e46cc70a5dd086daff2as',
    image: require('../images/profile-circle-small.png'),
  },
]

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  plusButtonRound: {
    backgroundColor: colors.primary,
    width: 19,
    height: 19,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletName: {
    margin: 20,
    marginTop: 40,
    fontSize: 16,
  },
  plusButtonRoundImage: {
    width: 16,
    height: 16,
  },
  addAddress: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  addAddressInput: {
    marginLeft: 20,
    fontSize: 16,
  },
  walletOwner: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  walletOwnerContent: {
    marginLeft: 20,
  },
  walletOwnerName: {
    fontSize: 17,
    marginBottom: 5,
  },
  walletOwnerImage: {
    marginTop: 5,
  },
  walletOwnerList: {
    flexGrow: 0,
  },
  ownersWarning: {
    backgroundColor: '#EFEFF3',
    borderTopColor: '#C7C7CC',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  ownersWarningText: {
    fontSize: 13,
  },
  numberOfSignaturesHeader: {
    borderTopWidth: 0,
  },
  numberOfSignaturesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  numberOfSignatures: {
    flex: 1,
  },
  numberControlButtonLeft: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRightWidth: 0,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    paddingHorizontal: 20,
    borderColor: '#C7C7CC',
  },
  numberControlTextLeft: {
    color: '#C7C7CC',
    fontSize: 24,
  },
  numberControlButtonRight: {
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    paddingHorizontal: 20,
    borderColor: '#614DBA',
  },
  numberControlTextRight: {
    color: '#614DBA',
    fontSize: 24,
    top: -2,
  },
})
