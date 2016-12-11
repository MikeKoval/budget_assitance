import * as env from '../../env';
// import requestApi from '../helper/requestApi';
// import prepareQuery from '../helper/prepareQuery';

const REQUEST_URL = env.API + 'users/';

export async function sync(data) {
  return fetch(REQUEST_URL + 'sync', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => response.json())
}