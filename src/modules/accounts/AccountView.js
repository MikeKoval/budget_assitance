import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../components/TextInput';
import Picker from '../../components/Picker';
import {Card} from 'react-native-material-design';
import AccountViewFormValidation from './AccountViewFormValidation';
import _ from 'lodash';

@reduxForm({
  form: 'accountForm',
  validate: AccountViewFormValidation
})
class AccountView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    getById: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    currencies: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    item: PropTypes.object
  };

  static contextTypes = {
    navigator: PropTypes.object
  };

  componentWillMount() {
    const {id, getById, initialize, getCurrencies, handleSubmit} = this.props;
    const {navigator} = this.context;
    navigator.actions = [
      ...navigator.actions,
      {
        icon: 'done',
        onPress: handleSubmit(this.onSubmit)
      }
    ];

    getCurrencies()
      .then(() => {
        if (id) {
          return getById(id)
            .then(() => {
              initialize({
                ...this.props.item
              })
            });
        }
      })
  }

  componentWillUnmount() {
    _.remove(this.context.navigator.actions, {icon: 'done'});
  }

  onSubmit = (data) => {
    const {insert, update, getAll, id} = this.props;
    const {navigator} = this.context;
    const save = id ? update : insert;

    return save(data)
      .then(() => getAll())
      .then(() => navigator.back())
  };

  render() {
    const {currencies, id, loading} = this.props;

    if (id  && loading) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Card>
          <Card.Body>
            <Field
              name='name'
              component={TextInput}
              label="Account name"
              autoFocus
            />
            <Field
              name='initialValue'
              component={TextInput}
              label="Initial value"
              keyboardType={'numeric'}
            />
            <Field
              name='currencyId'
              component={Picker}
              options={currencies}
              labelField='shortName'
              valueField='id'
              label="Currency"
            />
          </Card.Body>
        </Card>
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
  }
});

export default AccountView;
