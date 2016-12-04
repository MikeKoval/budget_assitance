import React, {PropTypes, Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import {RadioButtonGroup} from 'react-native-material-design';

class RadioBtnGroup extends Component {
  static propTypes = {
    style: PropTypes.object,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    selected: PropTypes.any
  };

  render() {
    const {
      style,
      input: {value, onChange},
      meta: {error, touched},
      label,
      items,
      selected,
      ...otherProps
    } = this.props;

    return (
      <View>
        {label && <Text style={(touched && error) ? [styles.label, {color: 'red'}] : styles.label}>{label}</Text>}
        <RadioButtonGroup
          value={value}
          selected={selected}
          onSelect={onChange}
          items={items}
          style={(touched && error) ? [style, {color: 'red'}] : style}
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

export default RadioBtnGroup;
