import {API_URL} from '@env';

const getFavouriteProducts = async () => {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    var result = await fetch(
      API_URL + 'getFavoriteProducts/' + global.user,
      requestOptions,
    );
    result = await result.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return {status: 'Error', data: 'Error'};
  }
};

export default getFavouriteProducts;
