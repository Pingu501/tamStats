import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';

const Button = props => {
  return (
      <TouchableOpacity
          onPress={props.onClick}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
      >
        <Text>{props.title}</Text>
      </TouchableOpacity>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
