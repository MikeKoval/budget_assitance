import {connect} from 'react-redux';
import AccountView from './AccountView';
import {insert, getCurrencies, update, getById, remove} from './AccountState';
import {getAll} from './AccountsState';

export default connect(
  state => ({
    item: state.account.item,
    items: state.accounts.items,
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
    remove(id) {
      return dispatch(remove(id));
    },
    getCurrencies() {
      return dispatch(getCurrencies());
    },
    getAll() {
      return dispatch(getAll());
    }
  })
)(AccountView);
