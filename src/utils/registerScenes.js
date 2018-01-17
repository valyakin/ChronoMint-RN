/* @flow */
import { Navigation } from 'react-native-navigation'

const registerScenes = (scenes, groupId, store, Provider) => {
  const result = {}
  Object.entries(scenes).forEach(([id, scene]) => {
    const sceneId = groupId ? `${groupId}/${id}` : id

    switch (typeof scene) {
      case 'function': {
        Navigation.registerComponent(sceneId, () => scene, store, Provider)
        result[id] = sceneId
        break
      }
      case 'object': {
        result[id] = registerScenes(scene, sceneId, store, Provider)
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
