import {API_URL} from '@env';
//import {useDispatch} from 'react-redux';
import {removeProductFromFavorite} from '../../Actions/actions';

export default async function addProductToFavourite(id, dispatch) {
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
    if (result.status == 'Success') {
      dispatch(removeProductFromFavorite(result.data.id));
    }
    return result;
  } catch (err) {
    return {status: 'Error', data: 'Error'};
  }
}
