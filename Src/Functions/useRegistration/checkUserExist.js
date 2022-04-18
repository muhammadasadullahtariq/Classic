import {API_URL} from '@env';

import {API_CONFIG} from '@env';

const registerUser = async googleId => {
  console.log('i called with', googleId);
  try {
    const response = await fetch(
      API_URL + 'checkUserExist/' + googleId,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
          redirect: 'follow',
        },
      },
    );
    const j = await response.json();
    console.log('g g ', j);
    console.log('now returning');
    return j;
  } catch (error) {
    console.log('asad', error);
    console.log('now returning');
    return 'User not found';
  }
};

export default registerUser;
