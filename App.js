import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Counter from './Container/Counter'

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Counter/>
        </View>
    );
  }
}

const styles = {
  container: {
    paddingTop: 100,
    flex: 1
  },
};
