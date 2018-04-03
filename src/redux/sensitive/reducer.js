/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
/* eslint-disable import/prefer-default-export */
import { types } from './actions'

const initialState = {
  usePinProtection: true,
}

export const sensitive = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_USE_PIN_PROTECTION: return {
      ...state,
      usePinProtection: payload,
    }
    default:
      return state
  }
}
