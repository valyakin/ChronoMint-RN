/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
/* eslint-disable import/prefer-default-export */
import { types, type TSensitiveActionTypes } from 'redux/sensitive/actions'

export type TSensitiveInitialState = {
  usePinProtection: boolean,
}

const initialState: TSensitiveInitialState = {
  usePinProtection: true,
}

export const sensitive = (state: TSensitiveInitialState = initialState, { type, payload }: { type: TSensitiveActionTypes, payload: any}) => {
  switch (type) {
    case types.SET_USE_PIN_PROTECTION: return {
      ...state,
      usePinProtection: payload,
    }
    default:
      return state
  }
}
