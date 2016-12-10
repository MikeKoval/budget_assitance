import {loop, Effects} from 'redux-loop';
import * as AccountsService from '../../services/AccountsService';

// Initial state
const initialState = {
  loaded: false,
  items: []
};

export async function getAllResponse(items) {
  return {
    type: GET_ACCOUNTS_RESPONSE,
    items
  };
}

export async function getAll() {
  try {
    return getAllResponse(await AccountsService.list());
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

export function setSelectedId(id) {
  return {
    type: SET_SELECTED_ACCOUNT_ID,
    id
  };
}


const GET_ACCOUNTS_REQUEST = 'AccountsState/GET_ACCOUNTS_REQUEST';
const GET_ACCOUNTS_RESPONSE = 'AccountsState/GET_ACCOUNTS_RESPONSE';
// const LOAD_ACCOUNTS = 'AccountsState/LOAD_ACCOUNTS';
const SET_SELECTED_ACCOUNT_ID = 'AccountsState/SET_SELECTED_ACCOUNT_ID';

// Reducer
export default function AccountsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ACCOUNTS_REQUEST:
      return loop(
        {
          ...state,
          loaded: false
        },
        Effects.promise(getAll)
      );

    case GET_ACCOUNTS_RESPONSE:
      return {
        ...state,
        items: action.items,
        loaded: true
      };

    case SET_SELECTED_ACCOUNT_ID:
      return {
        ...state,
        id: action.id
      };

    default:
      return state;
  }
}
