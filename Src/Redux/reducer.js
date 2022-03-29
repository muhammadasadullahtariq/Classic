import * as ActionTypes from '../Constants/actionType.js';

function reducer(state = [], action) {
  var list, indexOfProduct;
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      list =state;
      indexOfProduct = list.findIndex(product => product.id === action.product.id);
      if (indexOfProduct === -1) {
      return [...state, action.product]; // add new todo
      }
      else
      {
        return [
          ...list.slice(0, indexOfProduct),
          {
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            quantity: action.product.quantity,
          },
          ...list.slice(indexOfProduct + 1),
        ];
      }
    case ActionTypes.REMOVE_PRODUCT:
      list = state;
      indexOfProduct = list.findIndex(
        product => product.id === action.product.id,
      );
      if (indexOfProduct !== -1) {
        return [
          ...list.slice(0, indexOfProduct),
          ...list.slice(indexOfProduct + 1),
        ];
      } else return state;
    case ActionTypes.UPDATE_PRODUCT:
      list = state;
      indexOfProduct = list.findIndex(
        product => product.id === action.product.id,
      );
      if (indexOfProduct !== -1) {
        return [
          ...list.slice(0, indexOfProduct),
          {
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            quantity: action.product.quantity,
          },
          ...list.slice(indexOfProduct + 1),
        ];
      }
    case ActionTypes.PRODUCT_LIST:
      return state;

    default:
      // return state if no action  is matched or if action is not defined (for example, if action is undefined) or if action is not a string (for example, if action is null)
      return state;
  }
}

export default reducer;
