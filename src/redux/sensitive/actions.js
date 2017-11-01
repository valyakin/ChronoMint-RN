export const KEY_ADD = 'sensitive/KEY_ADD'
import { AES, enc } from 'crypto-js'
import { getEncryptedKeys } from './selectors'
import { verifyPinCode } from '../pincode/actions'
import DeviceInfo from 'react-native-device-info'

const salt = DeviceInfo.getUniqueID()

export const addKey = ({ key, provider, network }) => async (dispatch, getState) => {
  const { pinCodeHash } = getState().pincode

  const payload = {
    provider,
    network,
    key: AES.encrypt(key, pinCodeHash).toString(),
  }
  
  dispatch({ type: KEY_ADD, payload })

  return {}
}

export const getKey = ({ provider, network, pinCode, isFingerprintCorrect }) =>
  async (dispatch, getState) => {
    const { key } = getEncryptedKeys(getState(), provider, network)[0]

    if (!key) {
      return { error: 'No stored keys available'}
    }

    if (!isFingerprintCorrect) { 
      const isPinCodeCorrect = await dispatch(verifyPinCode(pinCode)) 
      
      if (!isPinCodeCorrect) {
        return { error: 'Incorrect pin-code' }
      }

    }
    
    const { pinCodeHash } = getState().pincode

    return {
      key: AES.decrypt(key, pinCodeHash).toString(enc.Utf8),
    }
  }
