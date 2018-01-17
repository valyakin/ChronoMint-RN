import * as actions from './actions.js'
const initialState = {
  keys: []
}

export const sensitive = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.KEY_ADD:
      return  {
        ...state,
        keys: [ payload ]
      }
    default:
      return state
  }
}
