import * as ActionTypes from '../Constants/actionType';

const addProduct=(product)=>{
    return {
        type:ActionTypes.ADD_PRODUCT,
        product
    }
}

const removeProduct=(product)=>{
    return {
        type:ActionTypes.REMOVE_PRODUCT,
        product
    }
}

const updateProduct=(product)=>{
    return {
        type:ActionTypes.UPDATE_PRODUCT,
        product
    }
}

const updateProductQuantity=(product)=>{
    return {
        type:ActionTypes.UPDATE_PRODUCT_QUANTITY,
        product
    }
}

const getProductList=()=>{
    return {
        type:ActionTypes.PRODUCT_LIST
    }
}

const checkProductExistInCart=(product)=>{
    return {
        type:ActionTypes.CHECK_PRODUCT_EXIST_IN_CART,
        product
    }
}



