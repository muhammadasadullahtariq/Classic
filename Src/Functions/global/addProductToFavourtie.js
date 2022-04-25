import {API_URL} from '@env';
//import {useDispatch} from 'react-redux';
import {addProductToFavorite} from '../../Actions/actions';

export default async function addProductToFavourite(id, dispatch) {
  //const dispatch = useDispatch();
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      userId: global.user,
      productId: id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    var result = await fetch(API_URL + 'addProductToFavorite', requestOptions);
    result = await result.json();
    if (result.status == 'Success') {
      dispatch(addProductToFavorite(result.data.id));
    }
    return result;
  } catch (err) {
    console.log(err);
    return {status: 'Error', data: 'Error'};
  }
}
