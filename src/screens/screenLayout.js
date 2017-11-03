/* @flow */
import React from 'react'
import PropTypes from 'prop-types'

const screenLayout = (Layout) => (Screen) => {
  if (!Layout) { 
    throw new Error ('No wrapper set for screen')
  }
  
  const ScreenWrapper = (props) => (
    <Layout screenOptions={Screen.screenOptions} navigator={props.navigator} >
      <Screen {...props}/>
    </Layout>
  )

  ScreenWrapper.propTypes = {
    navigator: PropTypes.object
  }

  ScreenWrapper.navigatorStyle = {
    ...(Layout.navigatorStyle || {}),
    ...(Screen.navigatorStyle || {})
  }

  ScreenWrapper.navigatorButtons = Screen.navigatorButtons || Layout.navigatorButtons

  return ScreenWrapper
}

export default screenLayout
