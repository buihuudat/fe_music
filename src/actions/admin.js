import axios from 'axios';
import * as types from '../constant/action_constant';

export function admin(userCredentials) {
  return dispatch => {
    dispatch({ type: types.START_PROCESSING });

    axios.get('/admin')
    .then(({ data: user }) => {
      localStorage.setItem('users', JSON.stringify(user));
    })
    .catch(err => {
      dispatch({ errors: err.response.data.errors });
    });
  };
}
