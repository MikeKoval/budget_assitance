import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {Button, COLOR} from 'react-native-material-design';
import Separator from '../../components/Separator';
import ScalableText from 'react-native-text';
import AppStore from '../../stores/AppStore';
import validate from './TransactionViewFormValidation';
import _ from 'lodash';

@reduxForm({
  form: 'transactionForm',
  validate
})
class TransactionView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  };

  state = {
    type: 1
  };

  static contextTypes = {
    navigator: PropTypes.object
  };

  componentWillMount() {
    const {navigator} = this.context;
    const {handleSubmit} = this.props;
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
    this.setState({
      ...this.state,
      type
    })
  };

  render() {
    const {type} = this.state;

    const theme = AppStore.getState().theme;
    const borderColor = COLOR[theme + '600'].color;

    const selectedTypeStyle = {backgroundColor: COLOR[theme + '600'].color, borderWidth: 1, borderColor: borderColor};
    const defaultTypeStyle = {borderWidth: 1, borderColor: borderColor};
    const defaultBackground = {backgroundColor: COLOR[theme + '500'].color};

    return (
      <View style={styles.container}>
        <View style={[styles.transactionType, defaultBackground]}>
          <TouchableOpacity
            style={[styles.transactionTypeBtn, type === 1 ?  selectedTypeStyle : defaultTypeStyle]}
            onPress={() => this.changeType(1)}
          >
            <Text style={styles.btnText}>INCOME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.transactionTypeBtn, type === 2 ?  selectedTypeStyle : defaultTypeStyle]}
            onPress={() => this.changeType(2)}
          >
            <Text style={styles.btnText}>EXPENSE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.transactionTypeBtn, type === 3 ?  selectedTypeStyle : defaultTypeStyle]}
            onPress={() => this.changeType(3)}
          >
            <Text style={styles.btnText}>TRANSFER</Text>
          </TouchableOpacity>
        </View>
        <Separator color={borderColor} />
        <View style={[styles.amountBlock, defaultBackground]}>
          <View style={styles.direction}>
            <Text style={styles.directionText}>-</Text>
          </View>
          <View style={styles.amount}>
            <ScalableText style={styles.amountText}>5000</ScalableText>
          </View>
          <View style={styles.currency}>
            <Text style={styles.currencyText}>UAH</Text>
          </View>
        </View>
        <View style={[styles.accountBlock, defaultBackground]}>
          <TouchableOpacity
            style={styles.account}
          >
            <Text style={styles.accountLabel}>Account</Text>
            <Text style={styles.accountText}>CASH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category}
          >
            <Text style={styles.categoryLabel}>Category</Text>
            <Text style={styles.categoryText}>HOUSING</Text>
          </TouchableOpacity>
        </View>
        <Separator color={borderColor} />
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
    color: 'white'
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
    fontSize: 32
  },
  currencyText: {
    color: '#fff',
    fontSize: 24,
  },
  directionText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold'
  },
  accountBlock: {
    height: 50,
    flexDirection: 'row'
  },
  account: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  accountLabel: {
    opacity: 0.5,
    color: '#fff'
  },
  accountText: {
    color: '#fff'
  },
  category: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  categoryLabel: {
    opacity: 0.5,
    color: '#fff'
  },
  categoryText: {
    color: '#fff'
  }
});

export default TransactionView;
