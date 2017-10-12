import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Text from './Text'
import { BACKGROUND, SHADOW_DARK } from '../../styles'

const Logo = ({ betaVersion }) => (
    <View style={style.container}>
        { betaVersion ?
            <Text style={style.betaVersion}>beta {betaVersion}</Text> :
            null
        }
        <Image source={require('../../assets/logo.png')} />
    </View>
)

Logo.propTypes = {
    betaVersion: PropTypes.string
}

const style = StyleSheet.create({
    container: {
        width: 200
    },
    betaVersion: {
        fontSize: 12,
        alignSelf: 'flex-end',
        color: BACKGROUND,
        textShadowRadius: 3,
        textShadowColor: SHADOW_DARK,
        textShadowOffset: { width: 0, height: 1 }
    }
})

export default Logo
