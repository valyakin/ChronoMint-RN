class Logger {
  log () {
    if (!__DEV__) return
    console.log(arguments) // eslint-disable-line
  }
  
  warn () {
    if (!__DEV__) return
    console.warn(arguments) // eslint-disable-line
  }

  error () {
    if (!__DEV__) return
    console.error(arguments) // eslint-disable-line
  }

  info () {
    if (!__DEV__) return
    console.info(arguments) // eslint-disable-line
  }
}

export default new Logger ()
