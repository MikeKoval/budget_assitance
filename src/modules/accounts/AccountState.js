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

    default:
      return state;
  }
}
