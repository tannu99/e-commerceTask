// actions/productActions.js
import {ADD_PRODUCT, REMOVE_PRODUCT} from '../../api/urlConstants';
import {
  addProductsStart,
  addProductsSuccess,
  addProductsFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  clearCart,
} from '../reducers/cartReducer';
import Toast from 'react-native-simple-toast';

export const addProducts = params => {
  return async dispatch => {
    dispatch(addProductsStart());
    try {
      const response = await fetch(ADD_PRODUCT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      if (data.response && data.response.error == 1) {
        throw new Error(data.response.error_message);
      }
      data.data.image = params.image;
      dispatch(addProductsSuccess(data.data));
      if (params.show) {
        Toast.show('Product added successfully!');
      }
    } catch (error) {
      console.log('eeeee', error);
      dispatch(addProductsFailure(error.message));
      Toast.show(error.message);
    }
  };
};

export const deleteProducts = params => {
  return async dispatch => {
    dispatch(deleteProductStart());
    try {
      const response = await fetch(REMOVE_PRODUCT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      console.log('rrrrr', response);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('dddd', data);
      if (data.response && data.response.error == 1) {
        throw new Error(data.response.error_message);
      }
      dispatch(deleteProductSuccess(params.product_id));
      Toast.show('Product deleted successfully!');
    } catch (error) {
      console.log('eeeee', error);
      dispatch(deleteProductFailure(error.message));
      Toast.show(error.message);
    }
  };
};

export const clearRequest = params => {
  return async dispatch => {
    dispatch(clearCart());
  };
};
