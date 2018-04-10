/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as types from './actions'
import ProfileModel from 'models/ProfileModel'

const initialState = {
  account: null,
  isSession: false,
  profile: new ProfileModel(),
  isCBE: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    // session
    case types.SESSION_CREATE:
      return {
        ...state,
        account: action.account,
        isSession: true,
      }
    case types.SESSION_DESTROY: {
      return initialState
    }
    // profile CRUD
    case types.SESSION_PROFILE:
      return {
        ...state,
        profile: action.profile,
        isCBE: action.isCBE,
      }
    case types.SESSION_PROFILE_UPDATE:
      return {
        ...state,
        profile: action.profile,
      }
    default:
      return state
  }
}
