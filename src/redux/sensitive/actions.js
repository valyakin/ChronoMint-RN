/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
export const DUCK_SENSITIVE = 'sensitive'

export const types = {
  SET_USE_PIN_PROTECTION: 'sensitive/SET_USE_PIN_PROTECTION',
}

export const setUsePinProtection = (payload: boolean) => ({
  type: types.SET_USE_PIN_PROTECTION,
  payload,
})
