import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert
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
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    getById: PropTypes.func.isRequired,
    getAll: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    currencies: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    item: PropTypes.object,
    items: PropTypes.array,
  };

  static contextTypes = {
    navigator: PropTypes.object
  };

  componentWillMount() {
    const {id, getById, initialize, getCurrencies, handleSubmit, items} = this.props;
    const {navigator} = this.context;

    if (id && items.length > 1) {
      navigator.actions.push({
        icon: 'delete',
        onPress: () => this.remove(id)
      });
    }

    navigator.actions.push({
      icon: 'done',
      onPress: handleSubmit(this.onSubmit)
    });

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
    _.remove(this.context.navigator.actions, {icon: 'delete'});
  }

  onSubmit = (data) => {
    const {insert, update, getAll, id, initialize} = this.props;
    const {navigator} = this.context;
    const save = id ? update : insert;

    return save(data)
      .then(() => getAll())
      .then(() => {
        const current = navigator.navigator.getCurrentRoutes()[0].path;
        const path = current.substr(0, current.lastIndexOf('.'));
        const obj = navigator._getRouteObject(path);

        if (obj) {
          return navigator.back();
        }
        else {
          initialize({});
          navigator.to('accounts');
        }
      })
  };

  remove = (id) => {
    const {remove, getAll, setSelectedId} = this.props;
    const {navigator} = this.context;
    Alert.alert(
      '',
      'Do you really want to delete this item?',
      [
        {text: 'NO'},
        {
          text: 'YES',
          onPress: () => remove(id)
            .then(() => getAll())
            .then(() => setSelectedId(null))
            .then(() => {
              const current = navigator.navigator.getCurrentRoutes()[0].path;
              const path = current.substr(0, current.lastIndexOf('.'));
              const obj = navigator._getRouteObject(path);

              if (obj) {
                return navigator.back();
              }
              else {
                navigator.to('accounts');
              }
            })
        }
      ]
    );
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
