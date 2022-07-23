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
    return result;
  } catch (err) {
    return {status: 'Error', data: 'Error'};
  }
};

export default getFavouriteProducts;
