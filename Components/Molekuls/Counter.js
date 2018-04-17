import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Button from '../Atoms/Button';

const width = Dimensions.get('window').width;

const toCount = ['Geschlagen', 'Aus', 'Decke', 'Kurz'];

export default class Counter extends React.Component {
  static defaultProps = {
    name: 'Klaus',
    position: 'Links',
    isVisible: true,
  };

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['Links', 'Mitte', 'Rechts']).isRequired,
    isVisible: PropTypes.bool,
    onRemoveCounter: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let state = {...props};

    state.countProps = {};

    toCount.forEach(countProp => {
      state.countProps[countProp] = 0;
    });

    this.state = state;
  }

  render() {
    if (!this.state.isVisible) {
      return;
    }

    return (
        <View style={style.counter}>
          <View style={style.infoRow}>
            <Text style={style.infoRowText}>
              {this.props.name}: {this.props.position}
            </Text>
            <Button onClick={this.handleRemoveCounter} title="Remove"/>
          </View>
          <View style={style.buttonRow}>
            {this.renderCountPropButtons()}
          </View>
        </View>
    );
  }

  renderCountPropButtons = () => {
    const buttons = [];
    for (const countProp in this.state.countProps) {
      if (this.state.countProps.hasOwnProperty(countProp)) {
        buttons.push(<Button
            style={{backgroundColor: '#1E6738'}}
            key={countProp}
            onClick={this.handleCountUp(countProp)}
            title={countProp + ' \n ' + this.state.countProps[countProp]}
            color="#fff"
        />);
      }
    }

    return buttons;
  };

  handleCountUp = countProp => {
    return () => {
      this.setState(
          {
            countProps:
                {
                  ...this.state.countProps,
                  [countProp]: this.state.countProps[countProp] + 1,
                },
          });
    };
  };

  handleRemoveCounter = () => {
    this.props.onRemoveCounter(this.props.id);
  };
}

const style = StyleSheet.create({
  counter: {
    width: width,
    height: 140,
    alignSelf: 'stretch',
  },
  infoRow: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoRowText: {
    fontSize: 18,
    color: '#7d7d7d',
  },
  buttonRow: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
  },
});