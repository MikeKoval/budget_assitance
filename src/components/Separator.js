import React, {PropTypes} from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

const Separator = React.createClass({
  displayName: 'Separator',

  render() {
    return (
      <View style={styles.separator}/>
    );
  }
});

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
});

export default Separator;
