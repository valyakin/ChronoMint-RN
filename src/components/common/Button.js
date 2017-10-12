import React from 'react'
import {
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native'
import Text from './Text'
import {
  PRIMARY,
  UNIT,
  RADIUS,
  BACKGROUND,
  SHADOW_DARK,
  SHADOW_LIGHT,
  PRIMARY_DARKEST
} from '../../styles'

const Button = ({ label, children, onPress }) => (
  <TouchableHighlight
    onPress={onPress}
    style={style.container}
    underlayColor={PRIMARY_DARKEST}
  >
    <View>
      { children ||      
        <Text style={style.label}>
            { label.toUpperCase() }
        </Text>
      }
    </View>
  </TouchableHighlight>
)

const style = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    paddingVertical: UNIT,
    paddingHorizontal: 2 * UNIT,
    borderRadius: RADIUS,
    shadowColor: SHADOW_DARK,
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 }
  },
  label: {
    color: BACKGROUND,
  }
})

export default Button
