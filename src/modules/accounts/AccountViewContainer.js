import {connect} from 'react-redux';
import AccountView from './AccountView';
import {insert} from './AccountState';

export default connect(
  state => ({}),
  dispatch => ({
    insert(item) {
      dispatch(insert(item));
    }
  })
)(AccountView);
