import {connect} from 'react-redux';
import {getAll, setSelectedId} from './AccountsState';
import AccountsView from './AccountsView';

export default connect(
  state => ({
    loaded: state.accounts.loaded,
    items: state.accounts.items,
    id: state.accounts.id
  }),
  dispatch => ({
    getAll() {
      return dispatch(getAll());
    },
    setSelectedId(id) {
      return dispatch(setSelectedId(id));
    }
  })
)(AccountsView);
