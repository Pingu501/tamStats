import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Button from '../Components/Atoms/Button';

const width = Dimensions.get('window').width;

export default class Counter extends React.Component {
  static defaultProps = {
    name: 'Klaus',
    toCount: ['Geschlagen', 'Aus', 'Decke', 'Kurz'],
  };

  static propTypes = {
    name: PropTypes.string,
    toCount: PropTypes.arrayOf(PropTypes.string),
  };

  constructor(props) {
    super(props);

    const state = {};

    props.toCount.forEach(countProp => {
      state[countProp] = 0;
    });

    console.log(state);
    this.state = state;
  }

  render() {
    return (
        <View style={style.counter}>
          <View style={style.infoRow}>
            <Text>{this.props.name}</Text>
            <Text>Position: Mitte</Text>
          </View>
          <View style={style.counterRow}>
            <Text>hey!</Text>
          </View>
          <View style={style.buttonRow}>
            {this.props.toCount.map(countProp => {
              return (
                  <Button
                      style={{backgroundColor: '#1E6738'}}
                      key={countProp}
                      onClick={this.handleCountUp(countProp)}
                      title={countProp + ' \n ' + this.state[countProp]}
                      color="#fff"
                  />
              );
            })}
          </View>
        </View>
    );
  }

  handleCountUp = countProp => {
    return () => {
      this.setState({[countProp]: this.state[countProp]++});
    };
  };
}

const style = StyleSheet.create({
  counter: {
    width: width,
    height: 200,
    alignSelf: 'stretch',
  },
  infoRow: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  counterRow: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  buttonRow: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'green',
  },
});