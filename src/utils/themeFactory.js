/* @flow */
import { StyleSheet } from 'react-native'

export default function themeFactory (commonTheme, themes) {
  const common = StyleSheet.create(commonTheme)

  const transformedThemes = Object.entries(themes).map(([title, theme]) => {
    const themeStyles = {...commonTheme, ...theme}

    Object.keys(themeStyles).map(name => {
      themeStyles[name] = Object.assign({}, commonTheme[name], theme[name])
    })
  
    return { [title]: StyleSheet.create(themeStyles) }
  })

  return (theme) => {
    const themes = Object.assign({ common }, ...transformedThemes)

    if (themes[theme]) {
      return themes[theme]
    }
    
    return themes['common']
  }
}
