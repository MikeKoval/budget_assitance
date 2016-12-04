import {connect} from 'react-redux';
import {getAll} from './CategoriesState';
import CategoriesView from './CategoriesView';
import {
  ListView,
} from 'react-native';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 != r2
});

export default connect(
  state => ({
    loaded: state.categories.loaded,
    items: state.categories.items,
    dataSource: ds.cloneWithRows(state.categories.items),
  }),
  dispatch => ({
    getAll() {
      dispatch(getAll());
    }
  })
)(CategoriesView);
