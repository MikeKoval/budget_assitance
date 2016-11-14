import React, {PropTypes, Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet
} from 'react-native';

class TextField extends Component {
  static propTypes = {
    style: PropTypes.object,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired
  };

  render() {
    const {
      style,
      input: {value, onChange},
      meta: {error, touched},
      label,
      ...otherProps
    } = this.props;

    return (
      <View>
        {label && <Text style={(touched && error) ? [styles.label, {color: 'red'}] : styles.label}>{label}</Text>}
        <TextInput
          // Let's only change the text color instead of showing error messages
          style={(touched && error) ? [style, styles.textInput, {color: 'red'}] : [styles.textInput, style]}
          onChangeText={(value) => onChange(value)}
          value={value}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40
  },
  label: {
    marginTop: 10
  }
});

export default TextField;
