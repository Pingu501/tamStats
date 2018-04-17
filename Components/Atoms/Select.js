import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';

export default class Select extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    })).isRequired,
    selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
        <View
            style={{position: 'relative', zIndex: 300}}
        >
          <TouchableOpacity
              onPress={this.onToggleSelect}>
            <Text style={{color: '#c3c3c3', fontSize: 20}}>{this.props.selectedValue}</Text>
          </TouchableOpacity>

          {this.state.isOpen ? this.renderOptions(this.props.options) : ''}
        </View>
    );
  }

  renderOptions = options => {
    const pickerItems = [];
    for (const index in options) {
      if (options.hasOwnProperty(index)) {
        const option = options[index];
        pickerItems.push(
            <TouchableOpacity
                key={'select-option' + index}
                onPress={this.onSelectChange(index)}
                style={{
                  padding: 12
                }}
            >
              <Text
                  style={{fontSize: 22, fontWeight: '500', color: '#999999'}}
              >
                {option.name}
              </Text>
            </TouchableOpacity>,
        );
      }
    }
    return (
        <View style={{
          position: 'absolute',
          right: 0,
          marginTop: 27,
          width: 100,
          backgroundColor: '#eaeaea',
          padding: 4,
          zIndex: 9000
        }}>
          {pickerItems}
        </View>
    );
  };

  onToggleSelect = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  onSelectChange = index => {
    return () => {
      this.props.onChange(this.props.options[index].value);
      this.setState({isOpen: false});
    };
  };
};
