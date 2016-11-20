import {connect} from 'react-redux';
import {getAll} from './AccountsState';
import AccountsView from './AccountsView';

export default connect(
  state => ({
    loaded: state.accounts.loaded,
    items: state.accounts.items
  }),
  dispatch => ({
    getAll() {
      dispatch(getAll());
    }
  })
)(AccountsView);
