import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';

const Button = props => {
  const fontSize = (props.size === "large" ? 20 : 12);

  return (
      <TouchableOpacity
          onPress={props.onClick}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#8CD867',
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
        }}>{props.title}</Text>
      </TouchableOpacity>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf('normal', 'large'),
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  size: 'normal'
};

export default Button;
