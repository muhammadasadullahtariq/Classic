import * as ActionTypes from '../Constants/actionType';

const addProduct = product => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    product,
  };
};

const removeProduct = product => {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    product,
  };
};

const updateProduct = product => {
  return {
    type: ActionTypes.UPDATE_PRODUCT,
    product,
  };
};

const updateProductQuantity = product => {
  return {
    type: ActionTypes.UPDATE_PRODUCT_QUANTITY,
    product,
  };
};

const getProductList = () => {
  return {
    type: ActionTypes.PRODUCT_LIST,
  };
};

const checkProductExistInCart = product => {
  return {
    type: ActionTypes.CHECK_PRODUCT_EXIST_IN_CART,
    product,
  };
};

const emptyCart = () => {
  return {
    type: ActionTypes.EMPTY_CART,
  };
};

const addUser = user => {
    return {
        type: ActionTypes.ADD_USER,
        user,
    };
};

const addProductToFavorite = product => {
    return {
        type: ActionTypes.ADD_PRODUCT_TO_FAVORITE,
        product,
    };
};

const removeProductFromFavorite = product => {
    return {
        type: ActionTypes.REMOVE_PRODUCT_FROM_FAVORITE,
        product,
    };
};

export {
  addProduct,
  removeProduct,
  updateProduct,
  updateProductQuantity,
  getProductList,
  checkProductExistInCart,
  emptyCart,
};
