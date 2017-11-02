/* @flow */
import React from 'react'

const screenLayout = (Layout) => (Screen) => {
  if (!Layout) { 
    throw new Error ('No wrapper set for screen')
  }
  
  const ScreenWrapper = (props) => (
    <Layout screenOptions={Screen.screenOptions} >
      <Screen {...props}/>
    </Layout>
  )

  ScreenWrapper.navigatorStyle = {
    ...(Layout.navigatorStyle || {}),
    ...(Screen.navigatorStyle || {})
  }

  ScreenWrapper.navigatorButtons = Screen.navigatorButtons || Layout.navigatorButtons

  return ScreenWrapper
}

export default screenLayout
