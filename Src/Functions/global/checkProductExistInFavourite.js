import {useSelector} from 'react-redux';

export default function checkProductExistInFavourite(productId) {
  var favouriteProducts = useSelector(state => state.user);
  console.log(favouriteProducts);
  favouriteProducts = favouriteProducts.favourties;
  console.log(favouriteProducts);
  if (favouriteProducts.indexOf(productId) > -1) {
    return true;
  }
  return false;
}
