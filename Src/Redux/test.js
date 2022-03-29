import React from 'react';

import store from './store.js';
import * as ActionTypes from '../Constants/actionType.js';
import {useDispatch, useSelector} from 'react-redux';

store.dispatch({type: ActionTypes.PRODUCT_LIST});

store.dispatch({
  type: ActionTypes.ADD_PRODUCT,
  product: {id: 1, name: 'Iphone', price: 1000, quantity: 1},
});
store.dispatch({
  type: ActionTypes.ADD_PRODUCT,
  product: {id: 2, name: 'Samsung', price: 2000, quantity: 1},
});

store.dispatch({
  type: ActionTypes.UPDATE_PRODUCT,
  product: {id: 2, name: 'Samsung', price: 3000, quantity: 1},
});

store.dispatch({
  type: ActionTypes.ADD_PRODUCT,
  product: {id: 1, name: 'Iphone', price: 1000, quantity: 1},
});

//store.dispatch({type:ActionTypes.REMOVE_PRODUCT, product:{id:1}});

console.log(store.getState());
