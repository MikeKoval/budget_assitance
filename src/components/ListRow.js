import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Separator from './Separator';

const ITEM_ICON_SIZE = 24;

const ARROW_RIGHT_ICON_SIZE = 16;
const ARROW_RIGHT_ICON_COLOR = '#dddddd';

const ListRow = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    showCourseDetails: PropTypes.func
  },

  render() {
    return (
      <View>
        {this.renderRow()}
        <Separator />
      </View>
    );
  },

  renderTitle() {
    return (
      <Text style={styles.title}>
        {this.props.item.name}
      </Text>
    );
  },

  renderRow() {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.itemButton}
          onPress={this.props.showCourseDetails}
        >
          <View style={styles.flexDirectionRow}>
            <View style={[styles.container, styles.flexDirectionRow, {marginRight: 4}]}>
              {this.renderTitle()}
            </View>
            <View style={styles.menuRightIconContainer}>
              {this.renderArrowRightIcon()}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  },

  renderArrowRightIcon() {
    return (
      <Icon name={'keyboard-arrow-right'} size={ARROW_RIGHT_ICON_SIZE} color={ARROW_RIGHT_ICON_COLOR} />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  menuRightIconContainer: {
    height: ITEM_ICON_SIZE,
    justifyContent: 'center',
    paddingRight: 4
  },
  itemButton: {
    height: 25,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: 'black'
  }
});

export default ListRow;
