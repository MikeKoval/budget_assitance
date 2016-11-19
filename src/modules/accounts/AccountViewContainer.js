import {connect} from 'react-redux';
import AccountView from './AccountView';
import {insert, getCurrencies} from './AccountState';

export default connect(
  state => ({
    info: state.account.info,
    loading: state.account.loading,
    error: state.account.error,
    currencies: state.account.currencies,
  }),
  dispatch => ({
    insert(item) {
      dispatch(insert(item));
    },
    getCurrencies() {
      dispatch(getCurrencies());
    }
  })
)(AccountView);
