/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import PrimaryButton from '../components/PrimaryButton'

const mapStateToProps = (state) => ({
  usePinProtection: state.get('sensitive').usePinProtection,
})

@connect(mapStateToProps)
export default class ConfirmMnemonic extends React.Component {
  constructor (props) {
    super(props)

    this.state = this.createInitialState()
  }

  handleDone = () => {
    const { usePinProtection, navigator, mnemonic } = this.props
    
    if (mnemonic !== this.state.mnemonic.join(' ')) {
      this.addError(I18n.t('ConfirmMnemonic.wrongMnemonicError'))
      return this.resetState()
    }
    
    navigator.push({
      screen: usePinProtection ? 'EnterPin' : 'WalletsList',
    })
  }
  
  handleWord = (word) => {
    const { words, mnemonic } = this.state
    
    if (mnemonic.length === 10) {
      this.handleDone()
    }
    
    words.splice(words.indexOf(word), 1)
    words.push(1)
    
    this.setState({
      mnemonic: [...mnemonic, word],
      words: [...words],
    })
  }
  
  createInitialState = () => ({
    mnemonic: [],
    words: this.props.mnemonic.split(' ').sort(() => Math.random() - 0.5),
  })

  resetState = () => {
    this.setState({ 
      mnemonic: [],
      words: this.props.mnemonic.split(' ').sort(() => Math.random() - 0.5),
    })
  }
  
  keyExtractor = (word, index) => index
  
  renderWord = ({ item }) => <Word word={item} onPress={this.handleWord} />

  render () {
    const { words } = this.state

    return (
      <View>
        <View style={styles.mnemonicContainer}>
          <Text style={styles.mnemonic}>
            {this.state.mnemonic.join(' ')}
          </Text>
        </View>
        <FlatList
          data={words}
          extraData={words}
          renderItem={this.renderWord}
          scrollEnabled={false}
          keyExtractor={this.keyExtractor}
          style={styles.wordButtons}
          columnWrapperStyle={styles.wordColumns}
          numColumns={3}
        />
        <PrimaryButton
          label={I18n.t('ConfirmMnemonic.done').toUpperCase()}
        />
      </View>
    )
  }
}

class Word extends React.Component {
  handlePress = () => {
    this.props.onPress(this.props.word)
  }

  render () {
    if (this.props.word === 1) {
      return <View style={styles.emptyWordContainer} />
    }

    return (
      <TouchableOpacity
        style={styles.wordContainer}
        onPress={this.handlePress}
      >
        <Text style={styles.word}>
          {this.props.word}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  mnemonicContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    margin: 20,
    height: 160,
    padding: 20,
  },
  wordButtons: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  wordColumns: {
    justifyContent: 'space-between',
  },
  wordContainer: {
    backgroundColor: '#614DBA',
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: '32%',
    marginVertical: 3,
    borderRadius: 3,
    height: 40,
    alignItems: 'center',
  },
  emptyWordContainer: {
    width: '32%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
    height: 40,
  },
  word: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  mnemonic: {
    color: '#6EE289',
    fontSize: 16,
    fontWeight: '900',
  },
})
