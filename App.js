import React from 'react';
import { View } from 'react-native';

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
    paddingTop: 30,
    flex: 1,
  },
};
