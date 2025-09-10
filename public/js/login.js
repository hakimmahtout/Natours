import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/v1/users/login', {
      email,
      password,
    });
    if (response.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get('/api/v1/users/logout');
    if (response.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! try again.');
  }
};
