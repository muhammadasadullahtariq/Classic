import {API_URL} from '@env';

export default async function getUSerActiveOrder() {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const result = await fetch(
      API_URL + 'userActiveOrder/' + global.user,
      requestOptions,
    );
    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {status: 'Fail', message: error};
  }
}