const isThatKey = (selectedProvider, selectedNetwork) => (
  ({ provider, network }) => (
    provider === selectedProvider && network === selectedNetwork
  )
)

export const hasKey = (state, provider, network) => (
  state.sensitive.keys.some(isThatKey(provider, network))
)

export const getEncryptedKeys = (state, provider, network) => (
  state.sensitive.keys.filter(isThatKey(provider, network))
)
