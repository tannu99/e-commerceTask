// store.js
import {configureStore} from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authReducer';

export default configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth :authReducer
  },
});
