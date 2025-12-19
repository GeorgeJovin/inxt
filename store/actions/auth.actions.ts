import { AppDispatch, persistor } from '@/store';
import { loginApi, logoutApi } from '@/api/auth.api';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutStart,
  logoutFailure,
} from '../slices/auth.slice';
import { LoginPayload } from '@/types/auth.types';
import { clearCustomer } from '../slices/customer.slice';
import { clearDevices } from '../slices/device.slice';

export const loginUser =
  (payload: LoginPayload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());

      const response = await loginApi(payload);

      dispatch(
        loginSuccess({
          customerId: response.customer_id,
          lastLoginDateTime: response.last_login_date_time,
        })
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.msg ||
        'Login failed';

      dispatch(loginFailure(message));
    }
  };

export const logoutUser =
  (customerId: string) => async (dispatch: AppDispatch) => {
    dispatch(logoutStart());

    try {
      const response = await logoutApi(customerId);
      if (response?.msg === 'success') {
        dispatch(logoutSuccess());
        dispatch(clearCustomer());
        dispatch(clearDevices());
        await persistor.purge();
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.warn('Logout API failed', error);
      dispatch(logoutFailure('Logout failed, please try again'));
    }
  };
