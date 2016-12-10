import {connect} from 'react-redux';
import {insert} from './TransactionState';
import {getAll} from './TransactionsState';
import {getAll as getAllAccounts} from '../accounts/AccountsState';
import {getAll as getAllCategories} from '../categories/CategoriesState';

import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {COLOR} from 'react-native-material-design';
import Separator from '../../components/Separator';
import AppStore from '../../stores/AppStore';
import validate from './TransactionViewFormValidation';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TextInput from '../../components/TextInput';
import DatePicker from '../../components/DatePicker';
import {Card} from 'react-native-material-design';
import Picker from '../../components/Picker';

@reduxForm({
  form: 'transactionForm',
  validate
})
@connect(
  state => ({
    loading: state.transaction.loading,
    error: state.transaction.error,
    accounts: state.accounts.items,
    categories: state.categories.items,
    form: state.form.transactionForm,
  }),
  dispatch => ({
    insert(item) {
      return dispatch(insert(item));
    },
    getAll() {
      dispatch(getAll());
    },
    getAllAccounts() {
      return dispatch(getAllAccounts());
    },
    getAllCategories(type = null) {
      return dispatch(getAllCategories(type));
    }
  })
)
class TransactionView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    getAllAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
  };

  state = {
    type: 1,
    number: 0
  };

  static contextTypes = {
    navigator: PropTypes.object
  };

  componentWillMount() {
    const {navigator} = this.context;
    const {handleSubmit, getAllCategories, getAllAccounts, initialize, accountId} = this.props;
    getAllCategories(this.state.type)
      .then(() => getAllAccounts())
      .then(() => {
        initialize({
          type: 1,
          categoryId: this.props.categories[0].id,
          accountId: accountId || this.props.accounts[0].id,
        });
      });
    navigator.actions = [
      ...navigator.actions,
      {
        icon: 'done',
        onPress: handleSubmit(this.onSubmit)
      }
    ];
  }

  componentWillUnmount() {
    _.remove(this.context.navigator.actions, {icon: 'done'});
  }

  onSubmit = (data) => {
    const {insert, getAll} = this.props;
    const {navigator} = this.context;
    return insert(data)
      .then(() => getAll())
      .then(() => navigator.back())
  };

  changeType = (type) => {
    const {getAllCategories, initialize, accounts, form} = this.props;
    this.setState({
      ...this.state,
      type
    });

    getAllCategories(type)
      .then(() => {
        initialize({
          type,
          categoryId: this.props.categories[0].id,
          accountId: (form && form.values && form.values.accountId) || accounts && accounts[0] && accounts[0].id
        });
      })
  };

  onPressNumber = (number) => {
    let newNumber = this.state.number + '' + number;
    if (newNumber.length > 1) {
      newNumber = newNumber.replace(/^0+/, '');
    }
    this.setState({
      ...this.state,
      number: newNumber
    });
    const {form, initialize} = this.props;
    initialize({
      ...form.values,
      amount: +newNumber
    });
  };

  onDeleteNumber = () => {
    const {number} = this.state;
    let newNumber = '';
    if (number === '0') {
      return;
    }
    else if (number.length === 1) {
      newNumber = '0';
    }
    else {
      newNumber = number.slice(0, -1);
    }

    this.setState({
      ...this.state,
      number: newNumber
    });
    const {form, initialize} = this.props;
    initialize({
      ...form.values,
      amount: +newNumber
    });
  };

  clear = () => {
    this.setState({
      ...this.state,
      number: 0
    });
    const {form, initialize} = this.props;
    initialize({
      ...form.values,
      amount: 0
    });
  };

  /*
   <TouchableOpacity
   style={[styles.transactionTypeBtn, type === 3 ?  selectedTypeStyle : defaultTypeStyle]}
   onPress={() => this.changeType(3)}
   >
   <Text style={styles.btnText}>TRANSFER</Text>
   </TouchableOpacity>
   */

  /*
   <View style={styles.actions}>
   <View style={styles.row}>
   <TouchableOpacity style={styles.actionCell}><Text style={styles.actionButtonText}>&divide;</Text></TouchableOpacity>
   </View>
   <View style={styles.row}>
   <TouchableOpacity style={styles.actionCell}><Text style={styles.actionButtonText}>&times;</Text></TouchableOpacity>
   </View>
   <View style={styles.row}>
   <TouchableOpacity style={styles.actionCell}><Text style={styles.actionButtonText}>-</Text></TouchableOpacity>
   </View>
   <View style={styles.row}>
   <TouchableOpacity style={styles.actionCell}><Text style={styles.actionButtonText}>+</Text></TouchableOpacity>
   </View>
   <View style={styles.row}>
   <TouchableOpacity style={styles.actionCell}><Text style={styles.actionButtonText}>=</Text></TouchableOpacity>
   </View>
   </View>
   */

  render() {
    console.log(this.props);
    const {type} = this.state;

    const theme = AppStore.getState().theme;
    const borderColor = COLOR[theme + '600'].color;

    const selectedTypeStyle = {backgroundColor: COLOR[theme + '600'].color, borderWidth: 1, borderColor: borderColor};
    const defaultTypeStyle = {borderWidth: 1, borderColor: borderColor};
    const defaultBackground = {backgroundColor: COLOR[theme + '500'].color};
    const {categories, accounts} = this.props;

    /*
     <Text style={styles.categoryLabel}>Category</Text>
     <Text style={styles.categoryText}>HOUSING</Text>
     */
    /*
     <Text style={styles.accountLabel}>Account</Text>
     <Text style={styles.accountText}>CASH</Text>
     */
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor={COLOR[`${theme}500`].color}
          tabBarUnderlineStyle={{backgroundColor: COLOR[`${theme}500`].color}}
          renderTabBar={()=><View />}
        >
          <View tabLabel="Main" style={styles.container}>
            <View style={[styles.transactionType, defaultBackground]}>
              <TouchableOpacity
                style={[styles.transactionTypeBtn, type === 2 ?  selectedTypeStyle : defaultTypeStyle]}
                onPress={() => this.changeType(2)}
              >
                <Text style={styles.btnText}>INCOME</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.transactionTypeBtn, type === 1 ?  selectedTypeStyle : defaultTypeStyle]}
                onPress={() => this.changeType(1)}
              >
                <Text style={styles.btnText}>EXPENSE</Text>
              </TouchableOpacity>
            </View>
            <Separator color={borderColor} />
            <View style={[styles.amountBlock, defaultBackground]}>
              <View style={styles.direction}>
                <Text style={styles.directionText}>{type === 1 ? '-' : (type === 2 ? '+' : '')}</Text>
              </View>
              <View style={styles.amount}>
                <Text style={styles.amountText}>{this.state.number}</Text>
              </View>
              <View style={styles.currency}>
                <Text style={styles.currencyText}>UAH</Text>
              </View>
            </View>
            <View style={[styles.accountBlock, defaultBackground]}>
              <TouchableOpacity
                style={styles.account}
              >
                <Field
                  name='accountId'
                  component={Picker}
                  options={accounts}
                  labelField='name'
                  valueField='id'
                  label="Account"
                  style={{
                    color: '#fff',
                    width: 100,
                  }}
                  labelStyle={{
                    opacity: 0.5,
                    color: '#fff',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.category]}
              >
                <Field
                  name='categoryId'
                  component={Picker}
                  options={categories}
                  labelField='name'
                  valueField='id'
                  label="Category"
                  style={{
                    color: '#fff',
                    width: 100
                  }}
                  labelStyle={{
                    opacity: 0.5,
                    color: '#fff'
                  }}
                />
              </TouchableOpacity>
            </View>
            <Separator color={borderColor} />
            <View style={styles.calculator}>
              <View style={styles.numbers}>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('7')}><Text style={styles.numberButtonText}>7</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('8')}><Text style={styles.numberButtonText}>8</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('9')}><Text style={styles.numberButtonText}>9</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('4')}><Text style={styles.numberButtonText}>4</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('5')}><Text style={styles.numberButtonText}>5</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('6')}><Text style={styles.numberButtonText}>6</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('1')}><Text style={styles.numberButtonText}>1</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('2')}><Text style={styles.numberButtonText}>2</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('3')}><Text style={styles.numberButtonText}>3</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('.')}><Text style={styles.numberButtonText}>.</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onPressNumber('0')}><Text style={styles.numberButtonText}>0</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cell} onPress={() => this.onDeleteNumber()} onLongPress={() => this.clear()}><Text style={styles.numberButtonText}>&larr;</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View tabLabel="additional" style={styles.container}>
            <Card>
              <Card.Body>
                <Field
                  name='note'
                  component={TextInput}
                  label="Note"
                  autoFocus
                />
                <Field
                  name='created'
                  component={DatePicker}
                  label="Date"
                  mode="datetime"
                  showIcon={false}
                  customStyles={{dateInput: {borderWidth: 0, }}}
                  autoFocus
                />
              </Card.Body>
            </Card>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
    fontFamily: 'sans-serif'
  },
  transactionType: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  transactionTypeBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
  amountBlock: {
    flexDirection: 'row',
    height: 150
  },
  direction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  amount: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  currency: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  amountText: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'sans-serif'
  },
  currencyText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'sans-serif'
  },
  directionText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
  accountBlock: {
    height: 80,
    flexDirection: 'row'
  },
  account: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  accountLabel: {
    opacity: 0.5,
    color: '#fff',
    fontFamily: 'sans-serif'
  },
  accountText: {
    color: '#fff',
    fontFamily: 'sans-serif'
  },
  category: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryLabel: {
    opacity: 0.5,
    color: '#fff',
    fontFamily: 'sans-serif'
  },
  categoryText: {
    color: '#fff',
    fontFamily: 'sans-serif'
  },
  calculator: {
    flex: 1,
    flexDirection: 'row'
  },
  numbers: {
    flex: 4,
    backgroundColor: '#ddd'
  },
  actions: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  numberButtonText: {
    fontSize: 32,
    fontFamily: 'sans-serif'
  },
  actionCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  actionButtonText: {
    fontSize: 28,
    fontFamily: 'sans-serif'
  },
});

export default TransactionView;
