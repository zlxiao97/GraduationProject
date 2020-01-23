import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tea: {
    color: 'teal'
  },
  deepPink: {
    color: 'deeppink'
  },
  gray: {
    color: 'gray'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Blink extends Component {
  componentDidMount() {
    setInterval(() => {
      this.setState(previousState => ({
        isShowingText: !previousState.isShowingText
      }));
    }, 1000);
  }
  state = { isShowingText: true };

  render() {
    if (this.state.isShowingText) {
      return (
        <Text style={this.props.style}>{this.props.text}</Text>
      )
    } else {
      return null;
    }
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Blink text="Tad" style={styles.tea}></Blink>
        <Blink text="Bob" style={styles.deepPink}></Blink>
        <Blink text="Lucy" style={styles.gray}></Blink>
      </View>
    )
  }
}
