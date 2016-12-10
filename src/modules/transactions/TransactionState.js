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

export async function updateResponse(updated) {
  return {
    type: UPDATE_TRANSACTION_RESPONSE,
    updated
  };
}

export async function update(item) {
  try {
    return updateResponse(await TransactionsService.update(item));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}


export async function getByIdResponse(item) {
  return {
    type: GET_TRANSACTION_RESPONSE,
    item
  };
}

export async function getById(id) {
  try {
    return getByIdResponse(await TransactionsService.getById(id));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

export async function removeResponse(removed) {
  return {
    type: REMOVE_TRANSACTION_RESPONSE,
    removed
  };
}

export async function remove(id) {
  try {
    return updateResponse(await TransactionsService.remove(id));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

const INSERT_TRANSACTION_REQUEST = 'TransactionState/INSERT_TRANSACTION_REQUEST';
const INSERT_TRANSACTION_RESPONSE = 'TransactionState/INSERT_TRANSACTION_RESPONSE';

const UPDATE_TRANSACTION_REQUEST = 'TransactionState/UPDATE_TRANSACTION_REQUEST';
const UPDATE_TRANSACTION_RESPONSE = 'TransactionState/UPDATE_TRANSACTION_RESPONSE';

const GET_TRANSACTION_REQUEST = 'TransactionState/GET_TRANSACTION_REQUEST';
const GET_TRANSACTION_RESPONSE = 'TransactionState/GET_TRANSACTION_RESPONSE';

const REMOVE_TRANSACTION_REQUEST = 'TransactionState/REMOVE_TRANSACTION_REQUEST';
const REMOVE_TRANSACTION_RESPONSE = 'TransactionState/REMOVE_TRANSACTION_RESPONSE';

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

    case GET_TRANSACTION_REQUEST:
      return loop(
        {
          ...state,
          loading: true
        },
        Effects.promise(getById, action.id)
      );

    case GET_TRANSACTION_RESPONSE:
      return {
        ...state,
        item: action.item,
        loading: false
      };

    case UPDATE_TRANSACTION_REQUEST:
      return loop(
        {
          ...state,
          saved: false
        },
        Effects.promise(update, action.item)
      );

    case UPDATE_TRANSACTION_RESPONSE:
      return {
        ...state,
        updated: action.updated,
        saved: true
      };

    case REMOVE_TRANSACTION_REQUEST:
      return loop(
        {
          ...state
        },
        Effects.promise(remove, action.item)
      );

    case REMOVE_TRANSACTION_RESPONSE:
      return {
        ...state,
        updated: action.updated
      };

    default:
      return state;
  }
}
