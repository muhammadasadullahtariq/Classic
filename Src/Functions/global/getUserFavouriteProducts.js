import {API_URL} from '@env';

export default async function addProductToFavourite() {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    var result = await fetch(
      API_URL + 'getFavoriteProducts/' + blobal.user,
      requestOptions,
    );
    result = await result.json();
    return result;
  } catch (err) {
    console.log(err);
    return {status: 'Error', data: 'Error'};
  }
}
