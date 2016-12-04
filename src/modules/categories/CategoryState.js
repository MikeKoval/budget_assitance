import {loop, Effects} from 'redux-loop';
import * as CategoriesService from '../../services/CategoriesService';

// Initial state
const initialState = {
  saved: false,
  item: {},
  loading: true,
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

export async function updateResponse(updated) {
  return {
    type: UPDATE_CATEGORY_RESPONSE,
    updated
  };
}

export async function update(item) {
  try {
    return updateResponse(await CategoriesService.update(item));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}


export async function getByIdResponse(item) {
  return {
    type: GET_CATEGORY_RESPONSE,
    item
  };
}

export async function getById(id) {
  try {
    return getByIdResponse(await CategoriesService.getById(id));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

const INSERT_CATEGORY_REQUEST = 'CategoryState/INSERT_CATEGORY_REQUEST';
const INSERT_CATEGORY_RESPONSE = 'CategoryState/INSERT_CATEGORY_RESPONSE';

const GET_CATEGORY_REQUEST = 'CategoryState/GET_CATEGORY_REQUEST';
const GET_CATEGORY_RESPONSE = 'CategoryState/GET_CATEGORY_RESPONSE';

const UPDATE_CATEGORY_REQUEST = 'CategoryState/UPDATE_CATEGORY_REQUEST';
const UPDATE_CATEGORY_RESPONSE = 'CategoryState/UPDATE_CATEGORY_RESPONSE';

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

    case GET_CATEGORY_REQUEST:
      return loop(
        {
          ...state,
          loading: true
        },
        Effects.promise(getById, action.id)
      );

    case GET_CATEGORY_RESPONSE:
      return {
        ...state,
        item: action.item,
        loading: false
      };

    case UPDATE_CATEGORY_REQUEST:
      return loop(
        {
          ...state,
          saved: false
        },
        Effects.promise(update, action.item)
      );

    case UPDATE_CATEGORY_RESPONSE:
      return {
        ...state,
        updated: action.updated,
        saved: true
      };

    default:
      return state;
  }
}
