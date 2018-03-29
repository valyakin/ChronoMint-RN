class Logger {
  static log () {
    if (!__DEV__) return
    console.log(arguments) // eslint-disable-line
  }
  
  static warn () {
    if (!__DEV__) return
    console.warn(arguments) // eslint-disable-line
  }

  static error () {
    if (!__DEV__) return
    console.error(arguments) // eslint-disable-line
  }

  static info () {
    if (!__DEV__) return
    console.info(arguments) // eslint-disable-line
  }
}

export default new Logger ()
