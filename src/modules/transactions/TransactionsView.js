import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getAll} from './TransactionsState';
import {getAll as getAllAccounts} from '../accounts/AccountsState';

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  RefreshControl,
  ScrollView
} from 'react-native';
import ActionButton from 'react-native-action-button';
import AppStore from '../../stores/AppStore';
import {COLOR} from 'react-native-material-design';
import Row from './TransactionsViewRow';
import Separator from '../../components/Separator';
import Picker from '../../components/Picker';
import {Field, reduxForm} from 'redux-form';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 != r2
});

@reduxForm({
  form: 'transactionsForm'
})
@connect(
  state => ({
    loaded: state.transactions.loaded,
    items: state.transactions.items,
    dataSource: ds.cloneWithRows(state.transactions.items),
    accounts: [{_id: 0, name: 'All accounts'}].concat(state.accounts.items),
    form: state.form.transactionsForm
  }),
  dispatch => ({
    getAll(accountId = null) {
      dispatch(getAll(accountId));
    },
    getAllAccounts() {
      dispatch(getAllAccounts());
    }
  })
)
export default class TransactionsView extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    dataSource: PropTypes.object,
    accounts: PropTypes.array,
    getAll: PropTypes.func.isRequired
  };

  static contextTypes = {
    navigator: PropTypes.object
  };

  state = {
    accountId: null
  };

  componentWillMount() {
    const {getAll, accountId, initialize} = this.props;
    getAll(accountId);
    this.setState({
      accountId
    });
    initialize({
      accountId
    })
  };

  changeAccount = (accountId) => {
    this.setState({
      accountId
    });
    this.props.getAll(accountId);
  };

  render() {
    console.log(this.props);
    const {loaded, dataSource, accounts} = this.props;
    const {navigator} = this.context;

    const theme = AppStore.getState().theme;

    if (!loaded) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    const refreshControl = (
      <RefreshControl
        refreshing={!this.props.loaded}
        enabled={this.props.loaded}
        onRefresh={() => this.props.getAll(this.state.accountId)}
      />
    );

    return (
      <View style={styles.container}>
        <Field
          name='accountId'
          component={Picker}
          options={accounts}
          labelField='name'
          valueField='_id'
          label="Account"
          onBeforeChange={this.changeAccount}
        />
        <Separator />
        <ListView
          style={styles.container}
          dataSource={dataSource}
          renderRow={(item) => (
            <Row item={item} />
          )}
          enableEmptySections={true}
          refreshControl={refreshControl}
        />
        <ActionButton buttonColor={COLOR[`${theme}500`].color} onPress={() => navigator.forward('addTransaction', 'Add transaction', {accountId: this.state.accountId})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
