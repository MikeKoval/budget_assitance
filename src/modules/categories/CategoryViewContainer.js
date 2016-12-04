import {connect} from 'react-redux';
import CategoryView from './CategoryView';
import {insert} from './CategoryState';
import {getAll} from './CategoriesState';

export default connect(
  state => ({
    loading: state.account.loading,
    error: state.account.error
  }),
  dispatch => ({
    insert(item) {
      return dispatch(insert(item));
    },
    getAll() {
      dispatch(getAll());
    }
  })
)(CategoryView);
