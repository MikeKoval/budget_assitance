import {connect} from 'react-redux';
import {getAll} from './AccountsState';
import AccountsView from './AccountsView';
import {
  ListView
} from 'react-native';
import immutable from 'immutable';
import * as NavigationState from '../../modules/navigation/NavigationState';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => !immutable.is(r1, r2)
});

export default connect(
  state => ({
    loaded: state.getIn(['accounts', 'loaded']),
    items: state.getIn(['accounts', 'items']),
    dataSource: ds.cloneWithRows(state.getIn(['accounts', 'items']))
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
