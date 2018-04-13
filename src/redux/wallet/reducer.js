import * as a from './actions'

const initialState = {
  isMultisig: false,
  address: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.WALLET_SWITCH_WALLET:
      return {
        ...state,
        isMultisig: action.isMultisig,
        address: action.address || null,
      }
    default:
      return state
  }
}
