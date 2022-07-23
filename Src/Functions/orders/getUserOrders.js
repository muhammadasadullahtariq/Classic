import {API_URL} from '@env';

const getUserOrders = async userId => {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const result = await fetch(
      API_URL + '/getOrdersOfUser/' + global.user,
      requestOptions,
    );
    const json = await result.json();
    return json;
  } catch (error) {
    return {status: 'Fail', message: error};
  }
};

export default getUserOrders;
