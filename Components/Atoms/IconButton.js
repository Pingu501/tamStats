import React from 'react';
import PropTypes from 'prop-types';
import {Image, Text, TouchableOpacity} from 'react-native';

const icons = {
  'trash': require('../../Assets/Icons/delete.png'),
  'hide': require('../../Assets/Icons/eye.png'),
  'show': require('../../Assets/Icons/eye-off.png'),
  'undo': require('../../Assets/Icons/skip-backward.png'),
};

const iconSize = 28;

export default class IconButton extends React.PureComponent {

  static propTypes = {
    icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
    onPress: PropTypes.func.isRequired,
  };

  render() {
    return (
        <TouchableOpacity
            onPress={this.handlePress}
            style={{marginLeft: 18}}
        >
          <Image source={icons[this.props.icon]}
                 style={{width: iconSize, height: iconSize}}/>
        </TouchableOpacity>
    );
  }

  handlePress = () => {
    this.props.onPress();
  };
}
