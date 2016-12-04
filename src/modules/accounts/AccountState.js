// import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as AccountsService from '../../services/AccountsService';
import * as CurrensiesService from '../../services/CurrensiesService';

// Initial state
const initialState = {
  saved: false,
  item: {},
  info: false,
  loading: false,
  error: false,
  currencies: []
};

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

export async function updateResponse(updated) {
  return {
    type: UPDATE_ACCOUNT_RESPONSE,
    updated
  };
}

export async function update(item) {
  try {
    return updateResponse(await AccountsService.update(item));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}


export async function getByIdResponse(item) {
  return {
    type: GET_ACCOUNT_RESPONSE,
    item
  };
}

export async function getById(id) {
  try {
    return getByIdResponse(await AccountsService.getById(id));
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

export async function getCurrenciesResponse(items) {
  return {
    type: GET_CURRENCIES_RESPONSE,
    items
  };
}

export async function getCurrencies() {
  try {
    return getCurrenciesResponse(await CurrensiesService.list());
  } catch (error) {
    // return fetchDataErrorOptimistic(error);
  }
}

const INSERT_ACCOUNT_REQUEST = 'AccountState/INSERT_ACCOUNT_REQUEST';
const INSERT_ACCOUNT_RESPONSE = 'AccountState/INSERT_ACCOUNT_RESPONSE';

const GET_CURRENCIES_REQUEST = 'AccountState/GET_CURRENCIES_REQUEST';
const GET_CURRENCIES_RESPONSE = 'AccountState/GET_CURRENCIES_RESPONSE';

const GET_ACCOUNT_REQUEST = 'AccountState/GET_ACCOUNT_REQUEST';
const GET_ACCOUNT_RESPONSE = 'AccountState/GET_ACCOUNT_RESPONSE';

const UPDATE_ACCOUNT_REQUEST = 'AccountState/UPDATE_ACCOUNT_REQUEST';
const UPDATE_ACCOUNT_RESPONSE = 'AccountState/UPDATE_ACCOUNT_RESPONSE';

// Reducer
export default function AccountStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INSERT_ACCOUNT_REQUEST:
      return loop(
        {
          ...state,
          saved: false
        },
        Effects.promise(insert, action.item)
      );

    case INSERT_ACCOUNT_RESPONSE:
      return {
        ...state,
        item: action.item,
        saved: true
      };

    case GET_CURRENCIES_REQUEST:
      return loop(
        {
          ...state
        },
        Effects.promise(getCurrencies, action.items)
      );

    case GET_CURRENCIES_RESPONSE:
      return {
        ...state,
        currencies: action.items
      };

    case GET_ACCOUNT_REQUEST:
      return loop(
        {
          ...state,
          loading: true
        },
        Effects.promise(getById, action.id)
      );

    case GET_ACCOUNT_RESPONSE:
      return {
        ...state,
        item: {
          ...action.item,
          initialValue: action.item.initialValue + ''
        },
        loading: false
      };

    case UPDATE_ACCOUNT_REQUEST:
      return loop(
        {
          ...state,
          saved: false
        },
        Effects.promise(update, action.item)
      );

    case UPDATE_ACCOUNT_RESPONSE:
      return {
        ...state,
        updated: action.updated,
        saved: true
      };

    default:
      return state;
  }
}
