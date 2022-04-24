import {API_URL} from '@env';

export default async function addProductToFavourite(id) {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      userId: global.user,
      productId: id,
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    var result = await fetch(API_URL + 'deleteFavoriteProduct', requestOptions);
    result = await result.json();
    return result;
  } catch (err) {
    console.log(err);
    return {status: 'Error', data: 'Error'};
  }
}
