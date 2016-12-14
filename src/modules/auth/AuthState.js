import { AsyncStorage }  from 'react-native';
import * as UsersService from '../../services/UsersService';
import * as env from '../../../env';
import localDB from '../../utils/db';
import PouchDB from 'pouchdb-react-native';
import * as AccountsState from '../accounts/AccountsState';

const syncStates = ['change', 'paused', 'active', 'denied', 'complete', 'error'];

// Initial state
const initialState = {
  isLoggedIn: false,
  currentUser: null,
  authenticationToken: null
};

// Actions
const USER_LOGIN_SUCCESS = 'AppState/USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'AppState/USER_LOGIN_ERROR';

export function onUserLoginSuccessOptimistic(profile, token) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      profile,
      token
    }
  };
}

export function onUserLoginSuccess(profile, token) {
  return function (dispatch) {
    const accessToken = token.accessToken;

    dispatch(onUserLoginSuccessOptimistic(profile, token));
    const auth0Id = profile.userId && profile.userId.replace('google-oauth2|', 'u');

    const user = {
      accessToken,
      auth0Id,
      name: profile.name,
      email: profile.email
    };

    AsyncStorage.setItem('accessToken', accessToken);
    AsyncStorage.setItem('user', JSON.stringify(user));

    // console.log(user);

    const remoteDB = new PouchDB(env.REMOTE_DB_URL + auth0Id);
    const sync = localDB.sync(remoteDB, {
      live: true,
      retry: true
    });

    syncStates.forEach(state => {
      sync.on(state, () => setCurrentState(state));

      function setCurrentState(state) {
        // console.log('[Sync:' + state + ']');

        // this.setState({
        //   syncStatus: state
        // });
      }
    });

    localDB.changes({
      live: true,
      include_docs: true
    }).on('change', handleChange)
      // .on('complete', console.log.bind(console, '[Change:Complete]'))
      // .on('error', console.log.bind(console, '[Change:Error]'));

    function handleChange(change) {
      // console.log('[Change:Change]', change);

      var doc = change.doc;

      if (!doc) {
        return;
      }
    }

    UsersService.sync(user)
      .then((response) => {
        console.log('----response', response);
      })
      .then(() => {
        dispatch(AccountsState.getAll());
      })
      .catch((error) => {
        console.log(error);
      })
  };
}

export function onUserLoginError(error) {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
    error: true
  };
}

// Reducer
export default function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload.profile,
        authenticationToken: action.payload.token
      };

    case USER_LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
}
