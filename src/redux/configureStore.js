/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import Immutable from 'immutable'
// import { browserHistory, createMemoryHistory } from 'react-router'
import { combineReducers } from 'redux-immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
// import { reducer as formReducer } from 'redux-form/immutable'
// import { loadTranslations, setLocale, i18nReducer, I18n } from 'platform/i18n'
// import moment from 'moment'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger as rCreateLogger } from 'redux-logger'
// import ls from 'utils/LocalStorage'
// import { globalWatcher } from '@chronobank/mint/src/redux/watcher/actions'
import { SESSION_DESTROY } from 'redux/session/actions'
import * as ducks from 'redux/ducks'

const getNestedReducers = (ducks) => {
  let reducers = {}

  Object.keys(ducks).forEach((r) => {
    // eslint-disable-next-line import/namespace
    reducers = { ...reducers, ...(typeof (ducks[r]) === 'function' ? { [r]: ducks[r] } : getNestedReducers(ducks[r])) }
  })
  return reducers
}

const configureStore = () => {

  // LISTEN FOR UNHANDLED PROMISE REJECTIONS
  // [AlexO] Maybe this is a temporary solution, but...
  window.onunhandledrejection = function (promise, reason) {
    // eslint-disable-next-line no-console
    console.log('%c window.onunhandledrejection', 'background: #222; color: red', promise, reason)
  }

  const initialState = new Immutable.Map()

  const appReducer = combineReducers({
    ...getNestedReducers(ducks),
  })

  const rootReducer = (state, action) => {
    let newState = state
    if (action.type === SESSION_DESTROY) {
      // const i18nState = state.get('i18n')
      newState = new Immutable.Map()
      // newState = newState.set('i18n', i18nState)
    }

    return appReducer(newState, action)
  }

  const composeEnhancers = __DEV__ ? composeWithDevTools({ realtime: true }) : compose

  // MIDDLEWARE
  const middleware = [thunk]

  // LOGGER

  // Two lines below to avoid strange behaviour, when process.env.NODE_ENV is undefined,
  // but console.log(process.env) dispalys Object {NODE_ENV: 'development} 
  const processEnv = process.env
  const isDevelopmentEnv = processEnv.NODE_ENV

  if (process.env['REDUX_LOGGER'] && isDevelopmentEnv === 'development') {
    const IGNORED_ACTIONS = [
      'mainWallet/TOKEN_BALANCE',
      'market/UPDATE_LAST_MARKET',
      'market/UPDATE_PRICES',
      'market/UPDATE_RATES',
      'tokens/fetched',
    ]
    const rLogger = rCreateLogger({
      collapsed: true,
      predicate: (getState, action) => !IGNORED_ACTIONS.includes(action.type),
    })
    middleware.push(rLogger)
  }

  //STORE
  // noinspection JSUnresolvedVariable,JSUnresolvedFunction
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middleware), 
    autoRehydrate(),
  )(createStore)
  
  return createStoreWithMiddleware(
    rootReducer,
    initialState,
  )
}

const store = configureStore()
export default store

persistStore(store,
  {
    storage: createSensitiveStorage({
      keychainService: "ChronoMint",
      sharedPreferencesName: "ChronoMint",
    }),
    whitelist: ['sensitive'],
  }
)
// store.dispatch(globalWatcher())

// export const DUCK_I18N = 'i18n'

// syncTranslationWithStore(store) relaced with manual connfiguration in the next 6 lines
// I18n.setTranslationsGetter(() => store.getState().get(DUCK_I18N).translations)
// I18n.setLocaleGetter(() => store.getState().get(DUCK_I18N).locale)

// const locale = ls.getLocale()
// set moment locale
// moment.locale(locale)

// store.dispatch(loadTranslations(require('../i18n/')))

// store.dispatch(setLocale(locale))
/** <<< i18n END */
