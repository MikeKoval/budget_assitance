import {connect} from 'react-redux';
import AccountView from './AccountView';

export default connect(
  state => ({
    test: state.getIn(['form', 'loginForm', 'values'])
  })
)(AccountView);
