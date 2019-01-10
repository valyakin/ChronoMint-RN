/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  View,
  Modal,
  SafeAreaView,
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import TextButton from '../../../components/TextButton'
import styles from './QRscannerModalStyles'


const QRscannerModal = ({ onSuccess, visible, modalToggle }) => {
  return (
    <Modal
      animationType='slide'
      visible={visible}
      onRequestClose={modalToggle}
    >
      <SafeAreaView style={styles.modal}>
        <View style={styles.actions}>
          <TextButton
            texStyle={styles.closeText}
            style={styles.close}
            label='Close Scanner'
            onPress={modalToggle}
          />
        </View>
        <QRCodeScanner
          cameraStyle={styles.scanner}
          containerStyle={styles.scanner}
          onRead={onSuccess}
          reactivateTimeout={300}
        />
      </SafeAreaView>
    </Modal>
  )
}

export default QRscannerModal
