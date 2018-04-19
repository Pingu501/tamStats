import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';

const icons = {
  'bin': '🗑',
  'hide': '📵',
  'undo': '🔙',
};

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
          <Text style={{fontSize: 20}}>{icons[this.props.icon]}</Text>
        </TouchableOpacity>
    );
  }

  handlePress = () => {
    this.props.onPress();
  };
}
