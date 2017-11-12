/* @flow */
import { Navigation } from 'react-native-navigation'

const registerScenes = (scenes, groupId) => {
  const result = {}
  Object.entries(scenes).forEach(([id, scene]) => {
    const sceneId = groupId ? `${groupId}/${id}` : id

    switch (typeof scene) {
      case 'function': {
        Navigation.registerComponent(sceneId, () => scene)
        result[id] = sceneId
        break
      }
      case 'object': {
        result[id] = registerScenes(scene, sceneId)
        break
      }
      default: {
        break
      }
    }
  })

  return result
}

export default registerScenes
