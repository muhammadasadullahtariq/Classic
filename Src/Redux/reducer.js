import * as ActionTypes from '../Constants/actionType.js';

function reducer(
  state = {products: [], totalPrice: 0, resturant: '', user: ''},
  action,
) {
  var list, indexOfProduct;
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      console.log(state, 'state');
      list = state.products;
      console.log(list, 'list');
      console.log(action.product, 'Product here ');
      indexOfProduct = list.findIndex(
        product => product._id === action.product._id,
      );
      if (indexOfProduct === -1) {
        console.log('Product not found');
        list.push({
          _id: action.product._id,
          name: action.product.name,
          price: action.product.price,
          quantity: action.product.quantity,
          shortDetail: action.product.shortDetail,
          image: action.product.image,
        });
        return {
          ...state,
          resturant: action.product.resturant,
          products: list,
          totalPrice:
            state.totalPrice + action.product.price * action.product.quantity,
        }; // add new todo
      } else {
        console.log('Product found');
        var totalPrice =
          state.totalPrice -
          list[indexOfProduct].price * list[indexOfProduct].quantity;
        var totalPrice =
          totalPrice + action.product.price * action.product.quantity;
        return {
          ...state,
          totalPrice: totalPrice,
          products: [
            ...list.slice(0, indexOfProduct),
            {
              _id: action.product._id,
              name: action.product.name,
              price: action.product.price,
              quantity: action.product.quantity,
              shortDetail: action.product.shortDetail,
              image: action.product.image,
            },
            ...list.slice(indexOfProduct + 1),
          ],
        };
      }
    case ActionTypes.REMOVE_PRODUCT:
      list = state.products;
      indexOfProduct = list.findIndex(
        product => product._id === action.product._id,
      );
      if (indexOfProduct !== -1) {
        if (list.length === 1) {
          return {...state, products: [], totalPrice: 0, resturant: ''};
        }
        var totalPrice =
          state.totalPrice -
          list[indexOfProduct].price * list[indexOfProduct].quantity;
        list = list
          .slice(0, indexOfProduct)
          .concat(list.slice(indexOfProduct + 1));
        return {
          ...state,
          products: list,
          totalPrice: totalPrice,
        };
      } else return state;
    case ActionTypes.UPDATE_PRODUCT:
      list = state.products;
      indexOfProduct = list.findIndex(
        product => product._id === action.product._id,
      );
      if (indexOfProduct !== -1) {
        var totalPrice =
          state.totalPrice -
          list[indexOfProduct].price * list[indexOfProduct].quantity;
        var totalPrice =
          totalPrice + action.product.price * action.product.quantity;
        list = [
          ...list.slice(0, indexOfProduct),
          {
            _id: action.product._id,
            name: action.product.name,
            price: action.product.price,
            quantity: action.product.quantity,
            shortDetail: action.product.shortDetail,
            image: action.product.image,
          },
          ...list.slice(indexOfProduct + 1),
        ];

        return {...state, totalPrice: totalPrice, products: list};
      }
    case ActionTypes.PRODUCT_LIST:
      return state;

    case ActionTypes.EMPTY_CART:
      return {...state, products: [], totalPrice: 0, resturant: ''};

    case ActionTypes.ADD_USER:
      return {...state, user: action.user};

    case ActionTypes.ADD_PRODUCT_TO_FAVORITE:
      var list = state.user.favourties;
      console.log(list, 'list');
      var indexOfProduct = list.indexOf(action.product);
      if (indexOfProduct === -1) {
        list.push(action.product);
        return {...state, user: {...state.user, favourties: list}};
      } else {
        return state;
      }
    case ActionTypes.REMOVE_PRODUCT_FROM_FAVORITE:
      list = state.user.favourties;
      indexOfProduct = list.indexOf(action.product);
      if (indexOfProduct !== -1) {
        list = list
          .slice(0, indexOfProduct)
          .concat(list.slice(indexOfProduct + 1));
        return {...state, user: {...state.user, favourties: list}};
      } else return state;
    default:
      // return state if no action  is matched or if action is not defined (for example, if action is undefined) or if action is not a string (for example, if action is null)
      return state;
  }
}

export default reducer;
