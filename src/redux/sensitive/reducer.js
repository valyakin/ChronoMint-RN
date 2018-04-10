/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as actions from './actions.js'

const initialState = {
  keys: [],
}

export const sensitive = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.KEY_ADD:
      return  {
        ...state,
        keys: [ payload ],
      }
    default:
      return state
  }
}
