import addProductToFavourite from './addProductToFavourtie';
import removeProductToFavourtie from './removeProductToFavourtie';

export default async function handelFavourite(flag, setFlag, productId, dispatch) {
  if (flag) {
    var result = await removeProductToFavourtie(productId, dispatch);
    if (result.status == 'Success') {
      setFlag(false);
    }
  } else {
    var result = await addProductToFavourite(productId, dispatch);
    if (result.status == 'Success') {
      setFlag(true);
    }
  }
}
