// actions/productActions.js
import {GET_PRODUCTS} from '../../api/urlConstants';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../reducers/productReducer';

export const fetchProducts = (params, callback) => {
  return async dispatch => {
    dispatch(fetchProductsStart());
    try {
      const response = await fetch(GET_PRODUCTS);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('dddd', data);

      if (data.result.length == 0) {
        throw new Error(data.response.error_message);
      }
      dispatch(fetchProductsSuccess(data.result.products));
      callback();
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};
