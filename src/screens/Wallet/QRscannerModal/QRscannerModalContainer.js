/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import QRscannerModal from './QRscannerModal'

class QRscannerModalContainer extends React.Component {

  handleSuccess = (e) => {
    const {
      modalToggle,
      onQRscan,
    } = this.props
    onQRscan(e)
    modalToggle()
  }

  render () {
    const { visible, modalToggle } = this.props
    return (
      <QRscannerModal
        onSuccess={this.handleSuccess}
        visible={visible}
        modalToggle={modalToggle}
      />
    )
  }
}

export default QRscannerModalContainer
