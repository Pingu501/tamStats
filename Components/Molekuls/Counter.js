import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../Atoms/Button';
import IconButton from '../Atoms/IconButton';

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

    state.history = [];
    this.state = state;
  }

  render() {
    return (
        <View style={this.state.isVisible
            ? style.counter
            : style.counterCollapsed}>
          <View style={style.infoRow}>
            <Text style={style.infoRowText}>
              {this.props.name}: {this.props.position}
            </Text>
            <View style={style.controlButtons}>
              <IconButton icon="bin" onPress={this.handleRemoveCounter}/>
              <IconButton icon="hide" onPress={this.onToggleVisibility}/>
              <IconButton icon="undo" onPress={this.onUndo}/>
            </View>
          </View>

          {this.state.isVisible
              ? <View style={style.buttonRow}>
                {this.renderCountPropButtons()}
              </View>
              : ''}
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

  onToggleVisibility = () => this.setState({isVisible: !this.state.isVisible});

  onUndo = () => {
    const history = this.state.history;

    if (history.length === 0) {
      return;
    }

    const lastAction = history.pop();
    const countProps = this.state.countProps;
    countProps[lastAction]--;
    this.setState({
      history: history,
      countProps: countProps,

    });
  };

  handleCountUp = countProp => {
    return () => {
      const history = this.state.history;
      history.push(countProp);
      this.setState(
          {
            countProps:
                {
                  ...this.state.countProps,
                  [countProp]: this.state.countProps[countProp] + 1,
                },
            history,
          });
    };
  };

  handleRemoveCounter = () => {
    this.props.onRemoveCounter(this.props.id);
  };
}

const style = StyleSheet.create({
  counter: {
    padding: 12,
    height: 140,
    alignSelf: 'stretch',
  },
  counterCollapsed: {
    height: 62,
    padding: 12,
    alignSelf: 'stretch',
  },
  infoRow: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoRowText: {
    flex: 5,
    fontSize: 20,
    color: '#7d7d7d',
  },
  buttonRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});