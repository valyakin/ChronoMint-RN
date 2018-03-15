/* @flow */
import * as React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

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
    backgroundColor: '#614DBA',
  },
})

export default Drawer
