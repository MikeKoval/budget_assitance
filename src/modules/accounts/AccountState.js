import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as AccountsService from '../../services/AccountsService';

// Initial state
const initialState = Map({
  saved: false,
  item: new Map([])
});

export async function insertResponse(item) {
  return {
    type: INSERT_ACCOUNT_RESPONSE,
    item
  };
}

export async function insert(item) {
  try {
    return insertResponse(await AccountsService.insert(item));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

const INSERT_ACCOUNT_REQUEST = 'AccountState/INSERT_ACCOUNT_REQUEST';
const INSERT_ACCOUNT_RESPONSE = 'AccountState/INSERT_ACCOUNT_RESPONSE';
// const LOAD_ACCOUNTS = 'AccountsState/LOAD_ACCOUNTS';

// Reducer
export default function AccountStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INSERT_ACCOUNT_REQUEST:
      return loop(
        state.set('saved', false),
        Effects.promise(insert, action.item)
      );

    case INSERT_ACCOUNT_RESPONSE:
      return state
        .set('item', action.item)
        .set('saved', true);

    default:
      return state;
  }
}
