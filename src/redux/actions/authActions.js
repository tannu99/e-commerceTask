import {LOGIN_URL, VERIFY_OTP_URL} from '../../api/urlConstants';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  otpVerificationStart,
  otpVerificationSuccess,
  otpVerificationFailure,
  clickScreen,
  logout,
} from '../reducers/authReducer';
import {clearRequest} from './cartActions';
import Toast from 'react-native-simple-toast';

export const loginRequest = (params, callback) => {
  return async dispatch => {
    dispatch(loginStart());
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();

      if (data.response && data.response.error == 1) {
        throw new Error(data.response.error_message);
      }

      dispatch(loginSuccess());
      Toast.show('OTP sent successfully!');
      callback();
    } catch (error) {
      console.log('eeee', error);
      dispatch(loginFailure(error.message));
      Toast.show(error.message);
    }
  };
};

export const verifyOTP = (params, callback) => {
  return async dispatch => {
    dispatch(otpVerificationStart());
    try {
      const response = await fetch(VERIFY_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();

      if (data.response && data.response.error == 1) {
        throw new Error(data.response.error_message);
      }

      dispatch(otpVerificationSuccess(data.message));
      Toast.show('Logged In successfully!');
      callback();
    } catch (error) {
      dispatch(otpVerificationFailure(error.message));
      Toast.show(error.message);
    }
  };
};

export const clickRequest = params => {
  return async dispatch => {
    dispatch(clickScreen(params));
  };
};

export const logoutRequest = params => {
  return async dispatch => {
    Toast.show('Logout successfully!');
    dispatch(logout());
    dispatch(clearRequest());
  };
};
