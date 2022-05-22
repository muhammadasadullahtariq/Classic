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
    const result = await fetch(
      API_URL + 'allProductsOfRestaurant/' + id,
      requestOptions,
    );
    const json = await result.json();
    return json;
  } catch (error) {
    console.log(error);
    return {status: 'Fail', message: error.message};
  }
}

export default getResturantProducts;