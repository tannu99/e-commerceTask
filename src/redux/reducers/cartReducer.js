// reducers/productReducer.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    addProductsSuccess(state, action) {
      const existingProductIndex = state.cart.findIndex(
        product =>
          product.products[0].attribute_group_id ===
          action.payload.products[0].attribute_group_id,
      );

      if (existingProductIndex !== -1) {
        // If the product already exists, update its values
        state.cart[existingProductIndex] = {
          ...state.cart[existingProductIndex],
          ...action.payload,
        };
      } else {
        // If the product doesn't exist, add it to the cart
        state.cart = [...state.cart, action.payload];
      }
      state.loading = false;
    },
    addProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.cart = state.cart.filter(
        item => item.products[0]?.item_id !== action.payload,
      );
    },
    deleteProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addProductsStart,
  addProductsSuccess,
  addProductsFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
