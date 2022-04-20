import {API_URL} from '@env';

async function getRecentAddedProducts() {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const result = await fetch(
      API_URL + 'getAllProducts?limit=20&page=1',
      requestOptions,
    );
    const json = await result.json();
    return json;
  } catch (error) {
    console.log(error);
    return {status: 'Fail', message: error.message};
  }
}

export default getRecentAddedProducts;
