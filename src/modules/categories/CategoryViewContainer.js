import {connect} from 'react-redux';
import CategoryView from './CategoryView';
import {insert, getById, update} from './CategoryState';
import {getAll} from './CategoriesState';

export default connect(
  state => ({
    loading: state.category.loading,
    error: state.category.error,
    item: state.category.item,
  }),
  dispatch => ({
    insert(item) {
      return dispatch(insert(item));
    },
    update(item) {
      return dispatch(update(item));
    },
    getById(id) {
      return dispatch(getById(id));
    },
    getAll() {
      dispatch(getAll());
    }
  })
)(CategoryView);
