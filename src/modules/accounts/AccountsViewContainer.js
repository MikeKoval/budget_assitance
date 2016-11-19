import {connect} from 'react-redux';
import {getAll} from './AccountsState';
import AccountsView from './AccountsView';
import {
  ListView
} from 'react-native';
import * as NavigationState from '../../modules/navigation/NavigationState';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 != r2
});

export default connect(
  state => ({
    loaded: state.accounts.loaded,
    items: state.accounts.items,
    dataSource: ds.cloneWithRows(state.accounts.items)
  }),
  dispatch => ({
    getAll() {
      dispatch(getAll());
    },
    add() {
      dispatch(NavigationState.pushRoute({key: 'Account', title: 'Add'}));
    }
  })
)(AccountsView);
