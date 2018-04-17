import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Counters from './Container/Counters';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Counters/>
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
