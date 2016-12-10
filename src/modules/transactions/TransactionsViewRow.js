import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Separator from '../../components/Separator';
import {COLOR} from 'react-native-material-design';
import moment from 'moment';

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
        {this.props.item.note}
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
            <View style={[styles.container, styles.flexDirectionColumn, {marginRight: 4}]}>
              <View><Text style={styles.category}>{item.category}</Text></View>
              <View>{this.renderTitle()}</View>
              <View><Text>{item.account}</Text></View>
            </View>
            <View style={styles.flexDirectionColumn}>
              <Text style={styles.date}>{item.created && moment(item.created).format('DD/MM/YYYY')}</Text>
              <View>
                <Text style={[styles.amount, item.type === 1 ? {color: EXPENSE_ICON_COLOR} : (item.type === 2 ? {color: INCOME_ICON_COLOR} : '')]}>
                  {item.type === 1 ? '-' : (item.type === 2 ? '+' : '')}&nbsp;
                  {item.currency}&nbsp;
                  {item.amount}&nbsp;
                  </Text>
              </View>
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
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexDirectionColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  menuRightIconContainer: {
    justifyContent: 'center',
    paddingRight: 4
  },
  itemButton: {
    // height: 25,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center'
  },
  title: {

  },
  expense: {
    color: 'red'
  },
  income: {
    color: 'green'
  },
  amount: {
    fontSize: 20,
    textAlign: 'right'
  },
  date: {
    textAlign: 'right'
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  }
});

export default ListRow;
