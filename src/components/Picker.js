import React, {PropTypes, Component} from 'react';
import {
  View,
  Picker,
  Text,
  StyleSheet
} from 'react-native';

class TextField extends Component {
  static propTypes = {
    style: PropTypes.object,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    labelField: PropTypes.string.isRequired,
    valueField: PropTypes.string.isRequired,
    onBeforeChange: PropTypes.func
  };

  render() {
    const {
      style,
      labelStyle,
      input: {value, onChange},
      meta: {error, touched},
      label,
      options,
      labelField,
      valueField,
      onBeforeChange,
      ...otherProps
    } = this.props;

    return (
      <View>
        {label && <Text style={(touched && error) ? [styles.label, labelStyle, {color: 'red'}] : [labelStyle, styles.label]}>{label}</Text>}
        <Picker
          // Let's only change the text color instead of showing error messages
          style={(touched && error) ? [style, styles.textInput, {color: 'red'}] : [styles.textInput, style]}
          onValueChange={(value) => {
            if (onBeforeChange) {
              onBeforeChange(value);
            }
            return onChange(value);
          }}
          selectedValue={value}
          {...otherProps}
        >
          {options.map(item =>
            <Picker.Item key={item[valueField]} label={item[labelField]} value={item[valueField]} />
          )}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
  },
  label: {
    marginTop: 10,
    flex: 1,
    paddingLeft: 8
  }
});

export default TextField;
