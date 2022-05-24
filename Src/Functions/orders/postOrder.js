import {API_URL} from '@env';

async function postOrder(
  location,
  products,
  resturantId,
  address,
  detail,
  totalPrice,
) {
  try {
    console.log(location);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: 'Testing asad 2',
      location: location,
      address: address,
      detail: detail,
      products: products,
      totalPrice: totalPrice,
      user: global.user,
      restaurant: resturantId,
      billMethod: 'cash',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const result = await fetch(API_URL + 'addOrder', requestOptions);
    const json = await result.json();
    return json;
  } catch (error) {
    console.log(error);
    return {status: 'Fail', message: error.message};
  }
}

export default postOrder;
