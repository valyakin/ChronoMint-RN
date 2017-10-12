import React from 'react'
import PropTypes from 'prop-types'
import { Text as RNText, StyleSheet } from 'react-native'

export default class Text extends React.Component {
  render () {
    return (
      <RNText
        {...this.props}
        style={[
          style.text,
          this.props.style
        ]}
      >
        {this.props.children}
      </RNText>
    )
  }
} 

Text.defaultProps = {
  children: null
}

Text.propTypes = {
  children: PropTypes.node
}

const style = StyleSheet.create({
  text: {
    backgroundColor: 'transparent'
  }
})