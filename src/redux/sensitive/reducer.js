/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
/* eslint-disable import/prefer-default-export */
import Immutable from 'immutable'
import { types } from './actions'

const initialState = {
  usePinProtection: true,
  accounts: Immutable.Map(),
}

export const sensitive = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_USE_PIN_PROTECTION: return {
      ...state,
      usePinProtection: payload,
    }
    case types.SET_PIN: return {
      ...state,
      pinHash: payload,
    }
    case types.ADD_ACCOUNT: {
      const { accounts, ...restState } = state

      return {
        ...restState,
        accounts: (accounts || Immutable.Map()).set(payload.address, payload),
      }
    }
    default:
      return state
  }
}
