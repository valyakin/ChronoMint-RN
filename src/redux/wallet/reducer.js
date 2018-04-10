import * as a from './actions'

const initialState = {
  isMultisig: false,
  address: null,
  token: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.WALLET_SWITCH_WALLET:
      return {
        ...state,
        isMultisig: action.isMultisig,
        address: action.address || null,
        token: action.token || null,
      }
    default:
      return state
  }
}
