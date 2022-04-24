import {API_URL} from '@env';

async function getNearByResturants() {
  const id = global.user;
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const result = await fetch(
      API_URL + 'getUserNearByResturants/' + id,
      requestOptions,
    );
    const json = await result.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return {status: 'Fail', message: error.message};
  }
}

export default getNearByResturants;
