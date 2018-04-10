/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import moment from 'moment'
// import { setLocale } from 'platform/i18n'
import ls from 'utils/LocalStorage'
import ipfs from 'utils/IPFS'
// import userMonitorService from 'chronobank/mint/src/user/monitorService'
import { modalsOpen } from '@chronobank/mint/src/redux/modals/actions'
// import ConfirmTxDialog from 'components/dialogs/ConfirmTxDialog/ConfirmTxDialog'
// import UserActiveDialog from 'components/dialogs/UserActiveDialog/UserActiveDialog'

export const removeWatchersUserMonitor = () => () => {
  // userMonitorService
  //   .removeAllListeners('active')
  //   .stop()
}

export const watchInitUserMonitor = () => (dispatch) => {
  // userMonitorService
  //   .on('active', () => dispatch(modalsOpen({ component: UserActiveDialog })))
  //   .start()
}

export const showConfirmTxModal = () => (dispatch) => new Promise((resolve) => {
  dispatch(modalsOpen({
    component: ConfirmTxDialog,
    props: {
      callback: (isConfirmed) => resolve(isConfirmed),
    },
  }))
}).catch((e) => {
  // eslint-disable-next-line
    console.error('Confirm modal error:', e)
  return false
})

export const changeMomentLocale = (locale, dispatch) => {
  moment.locale(locale)
  ls.setLocale(locale)
  // dispatch(setLocale(locale))
}

export const download = (hash, name) => async () => {
  // do nt limit a time to download
  const data = await ipfs.get(hash, 100000)
  const ref = document.createElement('a')
  ref.href = data.content
  if (name) {
    ref.download = name
  }
  document.body.appendChild(ref)
  ref.click()
  document.body.removeChild(ref)
}
