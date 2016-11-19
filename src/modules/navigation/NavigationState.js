import {NavigationExperimental} from 'react-native';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const SWITCH_TAB = 'NavigationState/SWITCH_TAB';

export function switchTab(index) {
  return {
    type: SWITCH_TAB,
    payload: index
  };
}

// Action creators
export function pushRoute(route) {
  return {
    type: PUSH_ROUTE,
    payload: route
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

// reducers for tabs and scenes are separate
const initialState = {
  tabs: {
    index: 0,
    routes: [
      {key: 'AccountsTab', title: 'ACCOUNTS'}
    ]
  },
  AccountsTab: {
    index: 0,
    routes: [{key: 'Accounts', title: 'Accounts Screen'}]
  }
};

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ROUTE: {
      // Push a route into the scenes stack.
      const route = action.payload;
      const tabs = state.tabs;
      const tabKey = tabs.routes[tabs.index].key;
      const scenes = state[tabKey];
      let nextScenes;
      // fixes issue #52
      // the try/catch block prevents throwing an error when the route's key pushed
      // was already present. This happens when the same route is pushed more than once.
      try {
        nextScenes = NavigationStateUtils.push(scenes, route);
      } catch (e) {
        nextScenes = scenes;
      }
      if (scenes !== nextScenes) {
        state[tabKey] = nextScenes;
        return state;
      }
      return state;
    }

    case POP_ROUTE: {
      // Pops a route from the scenes stack.
      const tabs = state.tabs;
      const tabKey = tabs.routes[tabs.index].key;
      const scenes = state[tabKey];
      const nextScenes = NavigationStateUtils.pop(scenes);
      if (scenes !== nextScenes) {
        state[tabKey] = nextScenes;
        return state;
      }
      return state;
    }

    case SWITCH_TAB: {
      // Switches the tab.
      const tabs = state.tabs;
      const nextTabs = NavigationStateUtils.jumpToIndex(tabs, action.payload);
      if (tabs !== nextTabs) {
        return {
          ...state,
          tabs: nextTabs
        };
      }
      return state;
    }

    default:
      return state;
  }
}
