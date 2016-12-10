import {loop, Effects} from 'redux-loop';
import * as CategoriesService from '../../services/CategoriesService';

// Initial state
const initialState = {
  loaded: false,
  items: []
};

export async function getAllResponse(items) {
  return {
    type: GET_CATEGORIES_RESPONSE,
    items
  };
}

export async function getAll(type = null) {
  try {
    return getAllResponse(await CategoriesService.list(type));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

const GET_CATEGORIES_REQUEST = 'CategoriesState/GET_CATEGORIES_REQUEST';
const GET_CATEGORIES_RESPONSE = 'CategoriesState/GET_CATEGORIES_RESPONSE';

// Reducer
export default function CategoriesStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return loop(
        {
          ...state,
          loaded: false
        },
        Effects.promise(getAll)
      );

    case GET_CATEGORIES_RESPONSE:
      return {
        ...state,
        items: action.items,
        loaded: true
      };

    default:
      return state;
  }
}
