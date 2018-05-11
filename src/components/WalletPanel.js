import React, { PureComponent }  from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  makeGetWalletTokensAndBalanceByAddress,
} from 'redux/wallet/selectors'
import styles from './styles/WalletPanelStyles'
import WalletImage from './WalletImage'

const makeMapStateToProps = () => {
  const getWalletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress()
  const mapStateToProps = (state, ownProps) => {
    const walletTokensAndBalanceData = getWalletTokensAndBalanceByAddress(state, ownProps)
    return {
      walletTokensAndBalance: walletTokensAndBalanceData,
    }
  }
  return mapStateToProps
}

type WalletPanelProps = {
  walletAddress: string, // From outside
  blockchainTitle: string, // From outside
  walletTokensAndBalance: Object, // From mapStateToProps
}

class WalletPanel extends PureComponent<WalletPanelProps> {
  render () {
    const {
      blockchainTitle,
      walletAddress,
      walletTokensAndBalance,
    } = this.props
    const walletTitle: string = ['My', blockchainTitle, 'Wallet'].join(' ')

    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.transactions}>
          <View />
        </View>
        <View style={styles.content}>
          <WalletImage
            style={styles.image}
          />
          <View style={styles.contentColumn}>
            <Text style={styles.title}>
              {
                walletTitle
              }
            </Text>
            <Text style={styles.address}>
              {
                walletAddress
              }
            </Text>
            <Text style={styles.balance}>
              {this.props.selectedCurrency} {walletTokensAndBalance.balance}
            </Text>
            <TokensList tokens={walletTokensAndBalance.tokens} />
            {
              false &&
                <View>
                  <TokensList tokens={wallet.tokens} />
                  <Exchange exchange={wallet.exchange} />
                </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default connect(makeMapStateToProps, null)(WalletPanel)
