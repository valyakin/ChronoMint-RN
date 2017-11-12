/* @flow */
import React from 'react'
import PropTypes from 'prop-types'

const sceneLayout = (Layout) => (Scene) => {
  if (!Layout) { 
    throw new Error ('No wrapper set for scene')
  }
  
  const SceneWrapper = (props) => (
    <Layout sceneOptions={Scene.sceneOptions || {}} navigator={props.navigator} >
      <Scene {...props}/>
    </Layout>
  )

  SceneWrapper.propTypes = {
    navigator: PropTypes.object
  }

  SceneWrapper.navigatorStyle = {
    ...(Layout.navigatorStyle || {}),
    ...(Scene.navigatorStyle || {})
  }

  SceneWrapper.navigatorButtons = Scene.navigatorButtons || Layout.navigatorButtons

  return SceneWrapper
}

export default sceneLayout
