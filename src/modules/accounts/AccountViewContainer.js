import {connect} from 'react-redux';
import AccountView from './AccountView';
import {insert, getCurrencies, update, getById} from './AccountState';
import {getAll} from './AccountsState';

export default connect(
  state => ({
    item: state.account.item,
    loading: state.account.loading,
    error: state.account.error,
    currencies: [{id: 0, name: '...', shortName: '...'}].concat(state.account.currencies),
  }),
  dispatch => ({
    insert(item) {
      return dispatch(insert(item));
    },
    update(item) {
      return dispatch(update(item));
    },
    getById(id) {
      return dispatch(getById(id));
    },
    getCurrencies() {
      return dispatch(getCurrencies());
    },
    getAll() {
      return dispatch(getAll());
    }
  })
)(AccountView);
