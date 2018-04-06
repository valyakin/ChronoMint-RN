/* @flow */

import * as React from 'react'
import {
  Slider,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import colors from '../utils/colors'
import {
  type TTokenModel,
} from '../types'

type FeeSliderProps = {|
  tokenID: string | TTokenModel,
  averageFee?: number,
  maximumValue?: number,
  minimumValue?: number,
  step?: number,
  handleValueChange(value: number): void,
|}

/**
 * Component for 'Send' screen: to adjust fee/gas before sending a transaction
 * 
 * @param {string} tokenID - Selected token ID
 * @param {number} [averageFee=0.1] - Minimum fee value
 * @param {number} [maximumValue=1.9] - Maximum fee value
 * @param {number} [step=0.1] - Slider's step
 * @param {number} [averageFee=1] - Recommended fee/gas value
 * @param {(value: number): void} handleValueChange - Update fee value on each slider's change
 */
const FeeSlider = ({
  tokenID,
  averageFee = 1,
  maximumValue = 0.1,
  minimumValue = 1.9,
  step = 0.1,
  handleValueChange,
}: FeeSliderProps) => (
  <View style={styles.feeSliderContainer}>
    <View style={styles.feeSliderLabel}>
      <Text style={styles.feeSliderLabelText}>
        Slow transaction
      </Text>
      <Text style={styles.feeSliderLabelText}>
        Fast transaction
      </Text>
    </View>
    <Slider
      maximumValue={maximumValue}
      minimumTrackTintColor='#786AB7'
      minimumValue={minimumValue}
      step={step}
      value={averageFee}
      onValueChange={handleValueChange}
    />
    <Text style={styles.feeSliderDetails}>
      <Text style={styles.feeSliderDetailsBold}>
        {`Transaction fee: ${tokenID} 0.001 (≈USD 10.00)`}
      </Text>
      <Text>
        {`${averageFee}.0x of average fee`}
      </Text>
    </Text>
  </View>
)

export default FeeSlider

const styles = StyleSheet.create({
  feeSliderContainer: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  feeSliderLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: -8,
  },
  feeSliderLabelText: {
    fontSize: 16,
    color: colors.foreground,
  },
  feeSliderDetails: {
    fontSize: 14,
    color: colors.foreground,
    fontWeight: '200',
    marginTop: 8,
  },
  feeSliderDetailsBold: {
    fontWeight: '700',
  },
})
