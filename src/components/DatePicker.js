import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Datepicker from 'react-native-datepicker';

class DatePicker extends Component {
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
        <Datepicker
          // Let's only change the text color instead of showing error messages
          style={(touched && error) ? [style, styles.input, {color: 'red'}] : [styles.input, style]}
          onDateChange={(value) => onChange(value)}
          date={value}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40
  },
  label: {
    marginTop: 10
  }
});

export default DatePicker;
