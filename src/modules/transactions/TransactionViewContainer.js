import {connect} from 'react-redux';
import TransactionView from './TransactionView';
import {insert} from './TransactionState';
import {getAll} from './TransactionsState';

export default connect(
  state => ({
    loading: state.transaction.loading,
    error: state.transaction.error
  }),
  dispatch => ({
    insert(item) {
      return dispatch(insert(item));
    },
    getAll() {
      dispatch(getAll());
    }
  })
)(TransactionView);
