/*eslint-disable react/prop-types*/

import React from 'react';
import AccountsViewContainer from './accounts/AccountsViewContainer';
import AccountViewContainer from './accounts/AccountViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const key = props.scene.route.key;

  if (key === 'Accounts') {
    return <AccountsViewContainer />;
  }

  if (key === 'Account') {
    return <AccountViewContainer />;
  }

  throw new Error('Unknown navigation key: ' + key);
}
