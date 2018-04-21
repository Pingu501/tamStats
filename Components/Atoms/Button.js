import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';

export default class Button extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['normal', 'large']),
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const fontSize = (this.props.size === 'large' ? 20 : 12);

    return (
        <TouchableOpacity
            onPress={this.handlePress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#87D86B',
              margin: 2,
              padding: 2,
              position: 'relative',
              zIndex: -2,
            }}
        >
          <Text style={{
            textAlign: 'center',
            fontSize: fontSize,
            color: 'white',
          }}>{this.props.title}</Text>
        </TouchableOpacity>
    );
  }

  handlePress = () => {
    this.props.onClick();
  };
}
