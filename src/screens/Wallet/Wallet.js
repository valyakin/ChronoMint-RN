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
      <Text>Wallet</Text>
      {props.addresses.toArray().map((address) => {
        const walletId = address.get('id')
        const walletAddress = address.get('address')

        return walletAddress ? (
          <Text key={walletId}>
            {walletId}: {walletAddress}
          </Text>
        ) : null
      })}
    </View>
  )
}

const mapStateToProps = (state) => ({
  addresses: state.get('mainWallet').get('addresses').get('list'),
})

export default connect(
  mapStateToProps
)(Wallet)
