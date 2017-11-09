import LocalizedStrings from 'react-native-localization'

const strings = new LocalizedStrings({
  'en': {
    'login': 'Login',
    'selectOptions': 'Select login options:',
    'mnemonicKey': 'Mnemonic key',
    'walletFile': 'Wallet file',
    'privateKey': 'Private key',
    'uPort': 'uPort'
  },
  'ru': {
    'login': 'Вход',
    'selectOptions': 'Выберите способ входа:',
    'mnemonicKey': 'Mnemonic key',
    'walletFile': 'Файл кошелька',
    'privateKey': 'Приватный ключ',
    'uPort': 'uPort'
  }
})


export default strings
