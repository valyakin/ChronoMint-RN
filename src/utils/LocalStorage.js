import { AsyncStorage } from 'react-native'
import { LOCAL_ID, LOCAL_PROVIDER_ID } from '@chronobank/login/network/settings'
import logger from 'src/utils/logger'

class Storage {
  /**
   * Fetches key and passes the result to callback, along with an Error if there is any.
   * @param {string} key 
   * @callback callback
   */
  getItem = async (key, callback) => {
    return await AsyncStorage.getItem(key, callback)
  }

  /**
   * Sets value for key and calls callback on completion, along with an Error if there is any.
   * @param {string} key
   * @param {string} value
   * @callback callback
   */
  setItem = async (key, value, callback) => {
    return await AsyncStorage.setItem(key, value, callback)
  }

  /**
   * @param {string} key
   */
  removeItem = async (key, callback) => {
    return await AsyncStorage.removeItem(key, callback)
  }

}

const storage = new Storage ()

const hasLocalStorage = typeof AsyncStorage !== 'undefined'

const TEST_RPC_ACCOUNT = 'testRPCAccount'
const LOCALE = 'locale'
const LAST_URL = 'lastURL'

const ERROR_NO_TOKEN = 'LocalStorage token not found'

// Simulating private properties
let _account, _provider, _network, _token, _localAccount, _locale, _memoryWithToken

/**
 * Get stored property from local storage
 * @param {string} key Stored property key
 */
const _getFromLS = async (key) => {
  try {
    if (hasLocalStorage) {
      const itemJson = await storage.getItem(key)

      return JSON.parse(itemJson)
    }
  } catch (e) {
    logger.warn(`LocalStorage: parse error`, e)
  }
}

/**
 * Set property to local storage
 * @param {string} key
 * @param {Object} data
 */
const _setToLS = async (key, data) => {
  if (hasLocalStorage) {
    return await storage.setItem(key, JSON.stringify(data))
  }
}

/**
 * 
 * @param {string} key 
 */
const _removeFromLS = async (key) => {
  if (hasLocalStorage) {
    return await storage.removeItem(key)
  }
}

/**
 * @param {string} key
 */
const _get = (key) => {
  if (!_token) {
    logger.warn('get', ERROR_NO_TOKEN)

    return
  }

  return _memoryWithToken[key]
}

const _set = (key, value) => {
  if (!_token) {
    logger.warn('set', ERROR_NO_TOKEN)

    return
  }

  _memoryWithToken[key] = value

  _setToLS(_token, _memoryWithToken)
}

class LocalStorage {
  createSession (account, provider, network) {
    if (_token) {
      logger.warn('Session already created', this.token)

      return
    }

    _account = account
    _provider = provider
    _network = network
    _token = `${_account}-${_provider}-${_network}`
    _localAccount = null
    _locale = this.getLocale()
    if (provider === LOCAL_PROVIDER_ID && network === LOCAL_ID) {
      this.setLocalAccount(account)
    }
    _memoryWithToken = _getFromLS(_token) || {}
  }

  isSession () {
    return !!_token
  }

  getToken () {
    return _token
  }

  getNetwork () {
    return _network
  }

  getProvider () {
    return _provider
  }

  destroySession () {
    _account = null
    _provider = null
    _network = null
    _token = null
    _memoryWithToken = {}
    _localAccount = null

    _removeFromLS(TEST_RPC_ACCOUNT)

    logger.info('LocalStorage: session destroyed')
  }

  setLocalAccount (account) {
    _localAccount = account

    _setToLS(TEST_RPC_ACCOUNT, account)
  }

  getLocalAccount = async () => {
    return _localAccount || await _getFromLS(TEST_RPC_ACCOUNT)
  }

  // TODO @dkchv: remove this! Use state.get('session').account instead
  // TODO @bshevchenko: I've removed @deprecated to hide confusing IDE inspections, we should provide complete and...
  // TODO @bshevchenko: ...proper solution for all cases before marking this method as deprecated.
  getAccount () {
    if (!_token) {
      logger.warn('getAccount', ERROR_NO_TOKEN)

      return
    }

    return _account
  }

  /**
   * Set locale directly
   * @param {string} locale 
   */
  setLocale (locale) {
    _locale = locale
    _setToLS(LOCALE, locale)
  }

  getLocale = async () => {
    return _locale || await _getFromLS(LOCALE) || 'en'
  }

  /**
   * @param {string} url 
   */
  setLastURL (url) {
    return _set(LAST_URL, url)
  }

  getLastURL () {
    return _get(LAST_URL)
  }
}

export default new LocalStorage()
