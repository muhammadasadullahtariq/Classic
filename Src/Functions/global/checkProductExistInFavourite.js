import {useSelector} from 'react-redux';

export default function checkProductExistInFavourite(productId) {
  var favouriteProducts = useSelector(state => state.user);
  favouriteProducts = favouriteProducts.favourties;
  if (favouriteProducts.indexOf(productId) > -1) {
    return true;
  }
  return false;
}
