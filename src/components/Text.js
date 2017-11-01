import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'

export default class AppText extends React.Component {
  static propTypes = {
    children: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  }
  render () {
    return (
      <Text
        {...this.props}
        style={[
          style.text,
          this.props.style
        ]}
      >
        {this.props.children}
      </Text>
    )
  }
}

const style = StyleSheet.create({
  text: {
    backgroundColor: 'transparent'
  }
})
