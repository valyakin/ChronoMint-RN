import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import Text from '../../components/Text'
import { COLOR_BACKGROUND } from '../../constants/styles'

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BACKGROUND,
  },
})

const Wallet = (props) => {
  return (
    <View style={styles.container}>
      <Text>Wallet:</Text>
      {props.addresses.map((address) => {
        const walletId = address.get('id')
        const walletAddress = address.get('address')

        return walletAddress ? (
          <Text key={walletId}>
            {walletId}: {walletAddress}
          </Text>
        ) : null
      })}
      <Text>Balances:</Text>
      {props.balances.map((balance) => {
        const balanceId = balance.get('id')
        const balanceAmount = balance.get('amout')

        return (
          <Text key={balanceId}>
            {balanceId}: {balanceAmount || 0}
          </Text>
        )
      })}
    </View>
  )
}

const mapStateToProps = (state) => ({
  balances: state.get('mainWallet').get('balances').get('list').toArray(),
  addresses: state.get('mainWallet').get('addresses').get('list').toArray(),
})

export default connect(
  mapStateToProps
)(Wallet)
