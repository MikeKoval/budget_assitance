import {connect} from 'react-redux';
import AccountView from './AccountView';
import {insert, getCurrencies} from './AccountState';
import {getAll} from './AccountsState';

export default connect(
  state => ({
    info: state.account.info,
    loading: state.account.loading,
    error: state.account.error,
    currencies: [{id: 0, name: '...', shortName: '...'}].concat(state.account.currencies),
  }),
  dispatch => ({
    insert(item) {
      return dispatch(insert(item));
    },
    getCurrencies() {
      return dispatch(getCurrencies());
    },
    getAll() {
      dispatch(getAll());
    }
  })
)(AccountView);
