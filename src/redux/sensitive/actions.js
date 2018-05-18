/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import { createCipher, createHash } from 'crypto'
import { addError } from 'login/redux/network/actions'
import isValid from '../../utils/validators'
import salt from '../../utils/salt'

export const DUCK_SENSITIVE = 'sensitive'

export const types = {
  SET_USE_PIN_PROTECTION: 'sensitive/SET_USE_PIN_PROTECTION',
  SET_PIN: 'sensitive/SET_PIN',
  ADD_ACCOUNT: 'sensitive/ADD_ACCOUNT',
}

export const setUsePinProtection = (payload: boolean) => ({
  type: types.SET_USE_PIN_PROTECTION,
  payload,
})

export const setPin = (pin: string) => async (dispatch) => {
  try {
    if (!isValid.pin(pin)) throw 'Invalid pin'

    const payload = await createHash(pin)

    dispatch({
      type: types.SET_PIN,
      payload,
    })
  } catch (error) {
    dispatch(addError(error))
  }
}

export const addAccount = ({ address, privateKey }, password: string) =>
  async (dispatch) => {
    try {
      const hash = createHash('sha256')
      hash.update(salt(password))
      const passwordHash = hash.digest('hex')

      const cipher = createCipher('aes-256-cbc', password)
      let encryptedPrivateKey = cipher.update(privateKey, 'utf8', 'hex')
      encryptedPrivateKey += cipher.final('hex')

      dispatch({
        type: types.ADD_ACCOUNT,
        payload: {
          address,
          encryptedPrivateKey,
          passwordHash,
        },
      })
    } catch (error) {
      dispatch(addError(error))
    }
  }
