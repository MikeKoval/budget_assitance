import React, {PropTypes} from 'react';
import {
  TextInput
} from 'react-native';

const TextField = (props) => {
  const {
    style,
    input: {value, onChange},
    meta: {error, touched},
    ...otherProps
  } = props;

  return (
    <TextInput
      // Let's only change the text color instead of showing error messages
      style={(touched && error) ? [style, {color: 'red'}] : style}
      underlineColorAndroid='transparent'
      onChangeText={onChange}
      value={value}
      {...otherProps}
    />
  );
};

TextField.propTypes = {
  style: PropTypes.object,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired
};

export default TextField;
