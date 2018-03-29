/* @flow */
import * as React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Switch,
  FlatList,
  Image,
} from 'react-native'
import SectionHeader from '../components/SectionHeader'
import Separator from '../components/Separator'
import colors from '../utils/colors'
import images from '../assets/images'

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
  
  handleAddNewToken = () => {
    this.props.navigator.push({
      screen: 'AddTokenToAdvancedWallet',
    })
  }

  keyExtractor = ({ id }) => id

  renderItem = ({ item }) => <Token {...item} />

  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <TextInput
          placeholderTextColor='#7F7F7F'
          placeholder='Wallet name'
          style={styles.walletName}
        />
        <SectionHeader title='Select tokens' />
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={Separator}
          scrollEnabled={false}
          data={tokens}
          style={styles.tokensList}
        />
        <Separator />
        <Text
          style={styles.addNew}
          onPress={this.handleAddNewToken}
        >
          Add new
        </Text>
        <Separator />
      </ScrollView>
    )
  }
}

const Token = ({ title, image, isChecked }) => (
  <View style={styles.tokenContainer}>
    { (typeof image !== 'undefined') && (
      <Image source={image} />
    )}
    <Text style={styles.tokenTitle}>{title}</Text>
    <Switch
      value={isChecked}
    />
  </View>
)

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  walletName: {
    padding: 20,
    paddingTop: 30,
  },
  tokenContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tokenTitle: {
    flex: 1,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '700',
  },
  tokensList: {
    flexGrow: 0,
  },
  addNew: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#614DBA',
    fontSize: 16,
  },
})

const tokens = [
  {
    id: 'eth',
    title: 'Ethereum',
    image: images.walletEthereum,
    isChecked: true,
  },
  {
    id: 'time',
    title: 'Time',
    image: images.walletTime,
  },
]
