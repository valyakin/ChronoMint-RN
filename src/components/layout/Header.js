import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import {
  UNIT
} from '../../styles'
import Logo from '../common/Logo'
import Icon from '../common/Icon'

const Header = ({ children }) => (
  <LinearGradient
    colors={['#644ebf', '#4d3e93', '#262448']}
    locations={[0, 0.37, 1]}
    style={style.container}
  >
    <View style={style.topRow}>
      <Logo betaVersion='0.1' />
      <Icon image={require('../../assets/menu.png')} />
    </View>
    {children}
  </LinearGradient>
)

Header.propTypes = {
  children: PropTypes.node
}

Header.defaultProps = {
  children: null
}

export default Header

const style = StyleSheet.create({
  container: {
    padding: 2 * UNIT
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
