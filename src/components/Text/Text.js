/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { Text as RNText } from 'react-native'
import styles from './styles'

type TextProps = {
  children: string,
  style: Object
}

export class Text extends React.Component<TextProps> {
  static propTypes = {
    children: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  }
  render () {
    return (
      <RNText
        {...this.props}
        style={[
          styles.text,
          this.props.style
        ]}
      >
        {this.props.children}
      </RNText>
    )
  }
}
