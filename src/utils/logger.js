class Logger {
  log () {
    console.log(arguments) // eslint-disable-line
  }
  
  warn () {
    console.warn(arguments) // eslint-disable-line
  }

  error () {
    console.error(arguments) // eslint-disable-line
  }

  info () {
    console.info(arguments) // eslint-disable-line
  }
}

export default new Logger ()
