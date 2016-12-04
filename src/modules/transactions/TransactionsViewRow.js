import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Separator from '../../components/Separator';
import {COLOR} from 'react-native-material-design';

const ICON_SIZE = 16;
const INCOME_ICON_COLOR = COLOR.paperGreen500.color;
const EXPENSE_ICON_COLOR = COLOR.paperRed500.color;

const ListRow = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired
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
    const {item} = this.props;
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.itemButton}
        >
          <View style={styles.flexDirectionRow}>
            <View style={[styles.container, styles.flexDirectionRow, {marginRight: 4}]}>
              {this.renderTitle()}
            </View>
            <View style={styles.menuRightIconContainer}>
              {item.type === 2 ?
                <Icon name={'add'} size={ICON_SIZE} color={INCOME_ICON_COLOR} /> :
                <Icon name={'remove'} size={ICON_SIZE} color={EXPENSE_ICON_COLOR} />
              }
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
    height: 24,
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
    color: 'black',
    fontWeight: 'bold'
  }
});

export default ListRow;
