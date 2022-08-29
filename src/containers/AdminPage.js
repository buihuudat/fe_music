import React from 'react';
import { Pages } from '../components';
import { isAuthenticated } from '../HOC';
import Swal from 'sweetalert2';

class AdminPage extends React.Component {
  componentDidMount() {
    const { authenticated, params, user, redirectTo } = this.props;
    if (authenticated && params.username !== user.username && user.primary !== '0') {
      Swal.fire({
        title: 'Error!!!',
        text: 'You are not ADMIN to view this page.',
        icon: 'error',
        confirmButtonText: 'Ok !!!',
        background: '#252c48',
        color: '#fff',
      });
      redirectTo('/');
    } else if (!authenticated) {
      redirectTo('/login');
    }
  }
  render() {
    return (
      <Pages.AdminPage
        {...this.props}
      />
    );
  }
}

export default isAuthenticated(AdminPage);