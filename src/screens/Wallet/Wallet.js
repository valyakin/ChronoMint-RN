import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Text from '../../components/Text/Text'

const Wallet = (props) => {
  return (
    <View>
      <Text>Wallet</Text>
      {props.addresses.toArray().map(address => {
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
  addresses: state.get('mainWallet').get('addresses').get('list')
})

export default connect(
  mapStateToProps
)(Wallet)
