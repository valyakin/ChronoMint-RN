/* @flow */
import { StyleSheet } from 'react-native'

export default function stylesFactory (commonTheme, themes) {
  const common = StyleSheet.create(commonTheme)
  const transformedThemes = Object.entries(themes).map(([title, theme]) => {
    return { [title]: StyleSheet.create({ ...commonTheme, ...theme }) }
  })

  return (theme = 'common') => {
    const themes = Object.assign({ common }, ...transformedThemes)
    
    return themes[theme]
  }
}
