/* @flow */
import { Navigation } from 'react-native-navigation'

type ScreenList = {
  [screenId: string]: any | ScreenList
}

const registerScreens = (screenList: ScreenList , groupId?: string, store?: any, Provider?: any): ScreenList => {
  const result: ScreenList = {}
  
  Object.entries(screenList).forEach(([id, screenItem]) => {
    const screenId = groupId ? `${groupId}/${id}` : id

    if (typeof screenItem === 'object') {
      // $FlowFixMe
      result[id] = registerScreens(screenItem, screenId, store, Provider)

      return
    }

    Navigation.registerComponent(screenId, () => screenItem, store, Provider)
    result[id] = screenId
  })

  return result
}

export default registerScreens
