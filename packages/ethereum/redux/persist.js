/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import storage from 'redux-persist/lib/storage'
import { createTransform } from 'redux-persist'
import { DUCK_ETHEREUM } from './constants'
import { ETH_PRIMARY_TOKEN } from '../constants'

const keepOnlyETHTokens = createTransform(

  // transform state on its way to being serialized and persisted.
  (inboundState/*, key*/) => {
    return inboundState
  },

  // transform state being rehydrated
  (outboundState/*, key*/) => {
    Object.keys(outboundState)
      .forEach((accountAddress) => {
        Object.keys(outboundState[accountAddress])
          .forEach((walletProperty) => {
            if (walletProperty === 'tokens') {
              Object.keys(outboundState[accountAddress][walletProperty])
                .forEach((token) => {
                  if (token !== ETH_PRIMARY_TOKEN) {
                    delete outboundState[accountAddress][walletProperty][token]
                  }
                })
            }
          })
      })
    return outboundState
  },

  // define which reducers this transform gets called for.
  {
    whitelist: ['list'],
  }
)

const ETHEREUM_PERSIST_CONFIG = {
  key: DUCK_ETHEREUM,
  version: '1.0',
  storage,
  whitelist: ['list'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
  transforms: [keepOnlyETHTokens],
}

export default ETHEREUM_PERSIST_CONFIG
