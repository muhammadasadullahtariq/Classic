import {API_URL} from '@env';

async function getResturantProducts(id) {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const resut = await fetch(API_URL + `findRestaurant/${id}`, requestOptions);
    const json = await resut.json();
    return json;
  } catch (error) {
    return {status: 'Fail', message: error.message};
  }
}

export default getResturantProducts;
