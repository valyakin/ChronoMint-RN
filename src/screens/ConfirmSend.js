/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

import {
  getMainWallet,
  getWTokens,
} from 'redux/session/selectors'
import { mainTransfer } from 'redux/mainWallet/actions'

import {
  type TToken,
  type TWallet,
  type TTokenModel,
  type TAmountModel,
  type TMainWalletModel,
  type TTokensCollection,
} from 'types'
import Amount from 'models/Amount'
import BigNumber from 'bignumber.js'
import colors from 'utils/colors'
import FeeSlider from 'components/FeeSlider'
import SectionHeader from 'components/SectionHeader'
import Separator from 'components/Separator'

type ConfirmSendProps = {
  wallet: TWallet;
  navigator: any; // FIXME: use correct flow type for this
  mainWallet: TMainWalletModel;
  tokensDuck: TTokensCollection;
  mainTransfer: (
    token: TTokenModel,
    amount: TAmountModel,
    recipient: string,
    feeMultiplier: number,
  ) => {}
}

type ConfirmSendState = {
  selectedToken: TToken;
  fee: number,
  recipient: string,
  amount: number | null,
}

const mapStateToProps = (state): TMainWalletModel => ({
  mainWallet: getMainWallet()(state),
  tokensDuck: getWTokens()(state),
})

const mapDispatchToProps  = (dispatch) => {
  return {
    mainTransfer: (
      token: TTokenModel,
      amount: TAmountModel,
      recipient: string,
      feeMultiplier: number,
    ) => dispatch(mainTransfer(token, amount, recipient, feeMultiplier)),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ConfirmSend extends React.Component<ConfirmSendProps, ConfirmSendState> {

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
        title: 'Confirm',
        id: 'confirm',
      },
   
    ],
  }

  constructor (props: SendProps) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  state = {
    selectedToken: (this.props.wallet.tokens && this.props.wallet.tokens[0]) || { id: 'ETH', amount: 0 },
    fee: 1,
    recipient: '',
    amount: null,
  }

  handleNavigatorEvent = ({ type, id }) => {
    if (type === 'NavBarButtonPress') {
      switch (id) {
        case 'cancel': {
          // Go back to previous screen (currently this is 'Send' screen only)
          this.props.navigator.pop()
          break
        }
        case 'done': {
          this.sendTransaction()
          break
        }
      }
    }
  }

  sendTransaction = () => {
    const token: TTokenModel = this.props.tokensDuck.item(this.state.selectedToken.id)
    // console.log(token.toJS())
    const toSendBigNumber: BigNumber = new BigNumber(this.state.amount)
    // console.log(toSendBigNumber)
    const bnWithDecimals: TAmountModel = token.addDecimals(toSendBigNumber)
    // console.log(bnWithDecimals)
    const amountToSend: TAmountModel = new Amount(bnWithDecimals, this.state.selectedToken.id)
    // console.log(amountToSend)
    const recipient: string = this.state.recipient
    const feeMultiplier = token.fee()
    // console.log(token, amountToSend, recipient, feeMultiplier)
    this.props.mainTransfer(token, amountToSend, recipient, feeMultiplier)
  }

  handleSubmitSuccess = () => {
    this.props.navigator.pop()
  }

  handleRecipientInput = (value: string) => {
    this.setState({
      recipient: value,
    })
  }

  handleAmountInput = (value: number) => {
    this.setState({
      amount: value,
    })
  }

  handlePressOnTokenSelector = (): void => {
    this.props.navigator.push({
      screen: 'SelectToken',
      title: 'Select Token',
      passProps: {
        // navigator: this.props.navigator,
        tokens: this.props.wallet.tokens,
        onPressAction: (data: TToken) => {
          this.setState({ selectedToken: data })
        },
      },
    })
  }

  onFeeSliderChange = (value: number) => {
    this.setState({
      fee: value,
    })
  }

  render () {
    const { wallet } = this.props
    return (
      <View>
        <LabeledText
          label={'Send To'}
          text={'gg'}
        />
        <LabeledText
          label={'BTC 0.2'} // TODO: to add value right form state
          text={'gg'}
        />
        <LabeledText
          label={'Fee'}
          text={'gg'}
        />
        <LabeledText
          label={'Balance'}
          text={'gg'}
        />
      </View>
    )
  }
}

type LabeledTextProps = {
  label: string,
  labelStyle?: StyleObj,
  text: string,
}
const LabeledText = ({
  label,
  labelStyle = styles.LabeledText_Label,
  text,
}: LabeledTextProps) => (
  <View style={styles.LabeledTextContainer}>
    <Text style={labelStyle}>
      {
        label
      }
    </Text>
    <Text style={styles.LabeledText_Text}>
      {
        text
      }
    </Text>
  </View>
)

const styles = StyleSheet.create({
  LabeledTextContainer: {},
  LabeledText_Label: {},
  LabeledText_Text: {},
})
