import {API_URL} from '@env';

const getUserById = async () => {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const result = await fetch(
      API_URL + 'getUserById/' + global.user,
      requestOptions,
    );
    const json = await result.json();
    return json;
  } catch (error) {
    console.log('error', error);
    return {status: 'Fail', message: error};
  }
};

export default getUserById;
