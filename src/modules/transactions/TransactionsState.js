import {loop, Effects} from 'redux-loop';
import * as TransactionsService from '../../services/TransactionsService';

// Initial state
const initialState = {
  loaded: false,
  items: []
};

export async function getAllResponse(items) {
  return {
    type: GET_TRANSACTIONS_RESPONSE,
    items
  };
}

export async function getAll(accountId = null) {
  try {
    return getAllResponse(await TransactionsService.list(accountId));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

const GET_TRANSACTIONS_REQUEST = 'TransactionsState/GET_TRANSACTIONS_REQUEST';
const GET_TRANSACTIONS_RESPONSE = 'TransactionsState/GET_TRANSACTIONS_RESPONSE';

// Reducer
export default function TransactionsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return loop(
        {
          ...state,
          loaded: false
        },
        Effects.promise(getAll)
      );

    case GET_TRANSACTIONS_RESPONSE:
      return {
        ...state,
        items: action.items,
        loaded: true
      };

    default:
      return state;
  }
}
