/* @flex */
import * as React from 'react'
import { View, Image } from 'react-native'
import Text from '../Text'
import styles from './styles'
import strings from './strings'

type CautionTextProps = {
  text: string
}

const CautionItem = ({ text }: CautionTextProps) =>
  <View style={styles.item}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.text}>{text}</Text>
  </View>

const Cautions = () =>
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../../assets/images/alert.png')}
    />
    <View style={styles.list}>
      <CautionItem text={strings.keepItSafe}/>
      <CautionItem text={strings.makeBackup}/>
      <CautionItem text={strings.dontShare}/>
      <CautionItem text={strings.dontLose}/>
    </View>
  </View>

export default Cautions
