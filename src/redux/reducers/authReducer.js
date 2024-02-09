// reducers/authReducer.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: false,
  loading: false,
  error: null,
  screen: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerificationStart(state) {
      state.loading = true;
      state.error = null;
    },
    otpVerificationSuccess(state) {
      state.loading = false;
      state.token = true;
    },
    otpVerificationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clickScreen(state, action) {
      state.screen = action.payload;
    },
    logout(state, action) {
      state.token = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  otpVerificationStart,
  otpVerificationSuccess,
  otpVerificationFailure,
  clickScreen,
  logout
} = authSlice.actions;

export default authSlice.reducer;
