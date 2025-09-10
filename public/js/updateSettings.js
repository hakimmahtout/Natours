import axios from 'axios';
import { showAlert } from './alerts';

export const updateData = async (form) => {
  try {
    const response = await axios.patch(
      'http://localhost:3000/api/v1/users/updateMe',
      form,
    );
    if (response.data.status === 'success') {
      showAlert('success', 'Data updated successfully');
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm,
) => {
  try {
    const response = await axios.patch(
      'http://localhost:3000/api/v1/users/updateMyPassword',
      {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    );
    if (response.data.status === 'success') {
      showAlert('success', 'Password updated successfully');
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
