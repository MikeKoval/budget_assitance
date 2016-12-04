// import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop';

import {reducer as formReducer} from 'redux-form';

import AuthStateReducer from '../modules/auth/AuthState';
import AccountsStateReducer from '../modules/accounts/AccountsState';
import AccountStateReducer from '../modules/accounts/AccountState';
import CategoriesStateReducer from '../modules/categories/CategoriesState';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';

const reducers = {
  // Authentication/login state
  auth: AuthStateReducer,

  session: SessionStateReducer,

  accounts: AccountsStateReducer,

  account: AccountStateReducer,

  categories: CategoriesStateReducer,

  form: formReducer
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
// const immutableStateContainer = Map();
// const getImmutable = (child, key) => child ? child.get(key) : void 0;
// const setImmutable = (child, key, value) => child.set(key, value);
//
const namespacedReducer = combineReducers(
  reducers,
  // immutableStateContainer,
  // getImmutable,
  // setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload.state, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(nextState, effects);
}
