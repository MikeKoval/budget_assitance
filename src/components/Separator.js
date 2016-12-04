import React, {PropTypes} from 'react';

import {
  View
} from 'react-native';

export default React.createClass({
  displayName: 'Separator',

  render() {
    const {color} = this.props;
    return (
      <View style={{height: 1,  backgroundColor: color || '#dddddd'}}/>
    );
  }
});