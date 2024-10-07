import apiClient from "./api";
import { loginFailure, loginRequest, loginSuccess, logoutFailure, logoutSuccess, logoutRequest } from "../slices/authSlice";

export const loginAdmin = (loginData) => async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await apiClient.post(
        '/auth/login',
        loginData,
        { withCredentials: true, }
      );
      if (response.data.user.account_type === 'admin') {
        dispatch(loginSuccess(response.data.user));
      } else {
        dispatch(loginFailure('Unauthorized access'));
      }
    } catch (error) {
      dispatch(loginFailure(error.response ? error.response.data.message : 'Network error'));
    }
  };
  
  export const logoutAdmin = (id) => async (dispatch) => {
    try {
      dispatch(logoutRequest());
      await apiClient.get(
        `/auth/logout/${id}`, 
        { withCredentials: true }
      );
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.response ? error.response.data.message : 'Network error during logout'));
    }
  }