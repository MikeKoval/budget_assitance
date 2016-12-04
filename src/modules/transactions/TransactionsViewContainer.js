import {connect} from 'react-redux';
import {getAll} from './TransactionsState';
import TransactionsView from './TransactionsView';
import {
  ListView,
} from 'react-native';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 != r2
});

export default connect(
  state => ({
    loaded: state.transactions.loaded,
    items: state.transactions.items,
    dataSource: ds.cloneWithRows(state.transactions.items),
  }),
  dispatch => ({
    getAll() {
      dispatch(getAll());
    }
  })
)(TransactionsView);
