import {API_URL} from '@env';

import {API_CONFIG} from '@env';

const registerUser = async googleId => {
  try {
    const response = await fetch(API_URL + 'checkUserExist/' + googleId, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
        redirect: 'follow',
      },
    });
    const j = await response.json();
    return j;
  } catch (error) {
    return 'User not found';
  }
};

export default registerUser;
