/* @flow */
import * as React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import colors from '../utils/colors'

class Drawer extends React.Component {
  renderItem = () => {
    return (
      <View />
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={[]}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
})

export default Drawer
