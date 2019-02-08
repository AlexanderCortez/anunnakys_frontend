import Axios from 'axios';
import { setAuthorizationToken } from './setAuthorizationToken';

export const checkToken = () => new Promise((resolve, reject) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    setAuthorizationToken(token);
    Axios.post('/api/auth/check-session-token', { token })
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        localStorage.removeItem('jwtToken');
        reject();
      });
  } else {
    // localStorage.removeItem('currentDatabase');
    // localStorage.removeItem('currentAccountFolder');
    // localStorage.removeItem('currentAccountFolder');
    reject();
  }
});