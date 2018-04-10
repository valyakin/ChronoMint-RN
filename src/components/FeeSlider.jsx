/* @flow */

import * as React from 'react'
import {
  Slider,
  Text,
  View,
} from 'react-native'

import {
  type TTokenModel,
} from 'types'

import styles from './styles/FeeSliderStyles'

type FeeSliderProps = {|
  tokenID: string | TTokenModel,
  value: number,
  maximumValue?: number,
  minimumValue?: number,
  step?: number,
  handleValueChange(value: number): void,
|}

/**
 * Title on top of slider: Slow <-> Fast.
 */
const FeeSliderTitle = () => (
  <View style={styles.feeSliderLabel}>
    <Text style={styles.feeSliderLabelText}>
      Slow transaction
    </Text>
    <Text style={styles.feeSliderLabelText}>
      Fast transaction
    </Text>
  </View>
)

/**
 * Update fee value on each slider's change
 *
 * @callback handleFeeUpdate
 * @param {number} value
 */

/**
 * Component for the 'Send' screen: to adjust fee/gas before sending a transaction
 * 
 * @param {string} tokenID Selected token ID
 * @param {number} [averageFee=0.1] Minimum fee value
 * @param {number} [maximumValue=1.9] Maximum fee value
 * @param {number} [step=0.1] Slider's step
 * @param {number} [value=1] Recommended fee/gas value
 * @param {handleFeeUpdate} handleValueChange Update fee value on each slider's change
 */
const FeeSlider = ({
  tokenID,
  value = 1,
  maximumValue = 0.1,
  minimumValue = 1.9,
  step = 0.1,
  handleValueChange = () => {}, // [AO] Do nothing by default
}: FeeSliderProps): React.Element<FeeSliderProps> => (
  <View style={styles.feeSliderContainer}>
    <FeeSliderTitle />
    <Slider
      maximumValue={maximumValue}
      minimumTrackTintColor='#786AB7'
      minimumValue={minimumValue}
      step={step}
      value={value}
      onValueChange={handleValueChange}
    />
    <View style={styles.feeSliderDetailsContainer}>
      <Text style={[styles.feeSliderDetails, styles.feeSliderDetailsBold]}>
        {`Transaction fee: ${tokenID} 0.001 (≈USD 10.00)`}
      </Text>
      <Text style={styles.feeSliderDetails}>
        {`${value.toFixed(1)}x of average fee`}
      </Text>
    </View>
  </View>
)

export default FeeSlider
