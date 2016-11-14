import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as AccountsService from '../../services/AccountsService';

// Initial state
const initialState = Map({
  loaded: false,
  items: []
});

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

const GET_ACCOUNTS_REQUEST = 'AccountsState/GET_ACCOUNTS_REQUEST';
const GET_ACCOUNTS_RESPONSE = 'AccountsState/GET_ACCOUNTS_RESPONSE';
// const LOAD_ACCOUNTS = 'AccountsState/LOAD_ACCOUNTS';

// Reducer
export default function AccountsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ACCOUNTS_REQUEST:
      return loop(
        state.set('loaded', false),
        Effects.promise(getAll)
      );

    case GET_ACCOUNTS_RESPONSE:
      return state
        .set('items', action.items)
        .set('loaded', true);

    default:
      return state;
  }
}
