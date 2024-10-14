import apiClient from './api.js';

export const sendEmail = (id, subject, content) => async (dispatch) =>  {
  dispatch({
    type: 'SEND_EMAIL_REQUEST',
  });
  try {
    const response = await apiClient.post(`/user/sendEmail/${id}`, {subject: subject, content: content});
    dispatch({
      type: 'SEND_EMAIL_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'SEND_EMAIL_FAILURE',
    });
  }
}