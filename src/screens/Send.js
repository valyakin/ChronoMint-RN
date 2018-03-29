/* @flow */
import * as React from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  Slider,
  StyleSheet,
} from 'react-native'
import Separator from '../components/Separator'
import SectionHeader from '../components/SectionHeader'
import colors from '../utils/colors'

export default class Send extends React.Component {
  render () {
    return (
      <ScrollView
        style={styles.scrollView}
      >
        <View style={styles.formHeader}>
          <Text style={styles.walletTitle}>
            MyWallet
          </Text>
          <Text style={styles.walletAddress}>
            n4XmX91N5FfccY678vaG1ELNtXh6skVES7
          </Text>
          <Separator style={styles.separatorDark} />
          <TokenSelector />
          <Separator style={styles.separatorDark} />
          <Text style={styles.walletValue}>
            TIME 4.00
          </Text>
          <Text style={styles.walletBalance}>
            USD 160.9
          </Text>
        </View>
        <View style={styles.formBody}>
          <Image
            source={require('../images/coin-time-small.png')}
            style={styles.tokenImage}
          />
          <Input placeholder='Recipient Address' />
          <Input placeholder='Amount, TIME' />
          <Text style={styles.sendBalance}>USD 0.00</Text>
          <SectionHeader title='Fee' />
          <FeeSlider />
          <Text style={styles.advancedFee}>
            Advanced Fee
          </Text>
          <SectionHeader title='Create template (optional)' />
          <Input placeholder='Template name' />
          <Separator style={styles.separatorLight} />
          <Text style={styles.scanQR}>
            Scan QR Code
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const TokenSelector = () => (
  <View style={styles.tokenSelector}>
    <Text style={styles.tokenSelectorLabel}>
      TIME
    </Text>
    <Image source={require('../images/chevron-down.png')} />
  </View>
)

const Input = (props) => (
  <TextInput
    style={styles.textInput}
    placeholderTextColor='#7F7F7F'
    {...props}
  />
)

const FeeSlider = () => (
  <View style={styles.feeSliderContainer}>
    <View style={styles.feeSliderLabel}>
      <Text style={styles.feeSliderLabelText}>Slow transaction</Text>
      <Text style={styles.feeSliderLabelText}>Fast transaction</Text>
    </View>
    <Slider
      minimumTrackTintColor='#786AB7'
      value={0.5}
    />
    <Text style={styles.feeSliderDetails}>
      <Text style={styles.feeSliderDetailsBold}>
        Transaction fee:
      </Text>
      &nbsp;
      ETH 0.001 (≈USD 10.00)
      {'\n'}
      1.0x of average fee
    </Text>
  </View>
)

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  separatorLight: {
    backgroundColor: '#707070', 
  },
  separatorDark: {
    backgroundColor: '#424066',
  },
  formHeader: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  walletTitle: {
    color: colors.background,
    marginTop: 30,
    marginHorizontal: 20,
    fontWeight: '700',
    fontSize: 16,
  },
  walletAddress: {
    color: '#A3A3CC',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  walletValue: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 30,
  },
  walletBalance: {
    marginHorizontal: 20,
    color: '#A3A3CC',
    fontSize: 16,
    marginTop: 4,
  },
  tokenSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  tokenSelectorLabel: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  tokenImage: {
    width: 64,
    height: 64,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: -32,
    right: 20,
  },
  formBody: {
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingTop: 30,
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
  sendBalance: {
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '200',
    color: '#7F7F7F',
    marginBottom: 30,
  },
  feeSliderContainer: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  feeSliderLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: -8,
  },
  feeSliderLabelText: {
    fontSize: 16,
    color: colors.foreground,
  },
  feeSliderDetails: {
    fontSize: 14,
    color: colors.foreground,
    fontWeight: '200',
    marginTop: 8,
  },
  feeSliderDetailsBold: {
    fontWeight: '700',
  },
  advancedFee: {
    margin: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#786AB7',
    marginBottom: 30,
  },
  scanQR: {
    textAlign: 'center',
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
    margin: 20,
  },
})
