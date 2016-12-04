import {loop, Effects} from 'redux-loop';
import * as CategoriesService from '../../services/CategoriesService';

// Initial state
const initialState = {
  saved: false,
  item: {},
  loading: false,
  error: false
};

export async function insertResponse(item) {
  return {
    type: INSERT_CATEGORY_RESPONSE,
    item
  };
}

export async function insert(item) {
  try {
    return insertResponse(await CategoriesService.insert(item));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

const INSERT_CATEGORY_REQUEST = 'CategoryState/INSERT_CATEGORY_REQUEST';
const INSERT_CATEGORY_RESPONSE = 'CategoryState/INSERT_CATEGORY_RESPONSE';

// Reducer
export default function CategoryStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INSERT_CATEGORY_REQUEST:
      return loop(
        {
          ...state,
          saved: false
        },
        Effects.promise(insert, action.item)
      );

    case INSERT_CATEGORY_RESPONSE:
      return {
        ...state,
        item: action.item,
        saved: true
      };
    default:
      return state;
  }
}
