import {loop, Effects} from 'redux-loop';
import * as TransactionsService from '../../services/TransactionsService';

// Initial state
const initialState = {
  saved: false,
  item: {},
  loading: false,
  error: false
};

export async function insertResponse(item) {
  return {
    type: INSERT_TRANSACTION_RESPONSE,
    item
  };
}

export async function insert(item) {
  try {
    return insertResponse(await TransactionsService.insert(item));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

const INSERT_TRANSACTION_REQUEST = 'TransactionState/INSERT_TRANSACTION_REQUEST';
const INSERT_TRANSACTION_RESPONSE = 'TransactionState/INSERT_TRANSACTION_RESPONSE';

// Reducer
export default function TransactionStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INSERT_TRANSACTION_REQUEST:
      return loop(
        {
          ...state,
          saved: false
        },
        Effects.promise(insert, action.item)
      );

    case INSERT_TRANSACTION_RESPONSE:
      return {
        ...state,
        item: action.item,
        saved: true
      };
    default:
      return state;
  }
}
