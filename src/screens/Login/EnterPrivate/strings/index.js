/* @flow */
import LocalizedStrings from 'react-native-localization'
import en from './en'
import ru from './ru'

const strings: typeof en = new LocalizedStrings({ en, ru })

export default strings
