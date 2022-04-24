import {useSelector} from 'react-redux';

function checkProductExistInFavourite(productId) {
  var isExist = false;
  var favouriteProducts = JSON.parse(localStorage.getItem('favouriteProducts'));
  if (favouriteProducts != null) {
    for (var i = 0; i < favouriteProducts.length; i++) {
      if (favouriteProducts[i].productId == productId) {
        isExist = true;
        break;
      }
    }
  }
  return isExist;
}
