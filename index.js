/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate',
  'Can\'t restore local session',
]

require('./src/app.js')
