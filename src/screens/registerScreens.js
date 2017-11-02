/* @flow */
import { Navigation } from 'react-native-navigation'

const registerScreens = (screens, groupId) => {
  const result = {}
  Object.entries(screens).forEach(([id, item]) => {
    const itemId = groupId ? `${groupId}/${id}` : id

    switch (typeof item) {
      case 'function': {
        Navigation.registerComponent(itemId, () => item)
        result[id] = itemId
        break
      }
      case 'object': {
        result[id] = registerScreens(item, itemId)
        break
      }
      default: {
        break
      }
    }
  })

  return result
}

export default registerScreens
