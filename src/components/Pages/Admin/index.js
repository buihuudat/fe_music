import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import ChartAdmin from './chart';

import './index.sass';

class AdminPage extends React.Component {
  state = {
    user: {},
    show: false,

    fullname: '',
    email: '',
    username: '',
    password: '',
    primary: '',
    phone: '',

    passwordDefault: '',
  }
  
  componentDidMount() {
    axios.post('/api/user/all')
    .then((response) => {
      this.setState({ user: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleOnClick() {
    this.setState({
      showInput: !this.state.showInput,
    });
  }
  
  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }    

  onSubmit(e) {
    // check for password is changed
    if (this.state.password != this.state.passwordDefault) {
      e.preventDefault();
      // update user
      axios.put(`/api/user/${this.state.username}/update`, {
        fullname: this.state.fullname,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        phone: this.state.phone,
        primary: this.state.primary,
      })
      .then((response) => {
        Swal.fire({
          title: 'Updated!',
          icon: 'success',
          text: `${this.state.fullname} has been updated`,
          background: '#252c48',
          color: '#fff',
          confirmButtonText: 'Nice😋!!',
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      e.preventDefault();
      // update user
      axios.put(`/api/user/${this.state.username}/update`, {
        fullname: this.state.fullname,
        email: this.state.email,
        username: this.state.username,
        phone: this.state.phone,
        primary: this.state.primary,
      })
      .then((response) => {
        Swal.fire({
          title: 'Updated!',
          icon: 'success',
          text: `${this.state.fullname} has been updated`,
          background: '#252c48',
          color: '#fff',
          confirmButtonText: 'Nice😋!!',
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  handleClickEdit(fullname, username, primary, email, phone, password) {
    this.setState({ show: true });
    this.setState({
      fullname: fullname,
      username: username,
      primary: primary,
      email: email,
      phone: phone || 'no phone number',
      password: password,
      passwordDefault: password,
    });
  }

  handleOnclickDel(fullname, username) {
    if (this.props.user.fullname == fullname) {
      Swal.fire({
        title: 'Oops!',
        text: 'You cannot delete yourself',
        icon: 'error',
        background: '#252c48',
        color: '#fff',
        confirmButtonText: 'Ok',
      });
      return;
    } else if (username) {
      Swal.fire({
        title: 'Deleting user',
        text: `Are you sure you want to delete ${fullname}?`,
        background: '#252c48',
        color: '#fff',
      })
    }
    Swal.fire({
      title: 'Deleting user',
      text: `Are you sure you want to delete ${fullname}?`,
      background: '#252c48',
      color: '#fff',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`/api/user/${username}/delete`, {
          data: {
            username: this.state.username,
          }
        })
        .then((response) => {
          Swal.fire({
            title: 'Deleted!',
            icon: 'success',
            text: `${response} has been deleted`,
            background: '#252c48',
            color: '#fff',
            confirmButtonText: 'Nice😋!!',
          });
        })
        .catch((error) => {
          console.log(error);
        });
        Swal.fire('Deleted!', '', 'success');
        window.location.reload();
      }
    })
    
  }
  
  render() {
    const { user } = this.state;
    console.log(this.state.passwordDefault)
    return (
      <div className='admin container'>
        <div className='chart-admin'>
          <ChartAdmin />
        </div>
        <table className="admin-table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Account</th>
              <th scope="col">Phone</th>
              <th scope="col">Primary</th>
              <th scope='col'>Created</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody className='tb-table'>
            {
              Object.keys(user).map((items, index) => {
                const item = (user[items]);
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.email}</td>
                    <td>{item.fullname}</td>
                    <td>{item.username}</td>
                    <td>{item.phone}</td>
                    <td>
                      {
                        // eslint-disable-next-line no-nested-ternary
                        item.primary === '0' ?
                        'ADMIN' :
                        item.primary === '1' ?
                        'Premium' : 'Normal'
                      }
                    </td>
                    <td>{item.createdAt}</td>
                    <td className='table-btn'>
                      <a>
                        <i
                          className='ion-edit admin-btn-edit'
                          onClick={() => this.handleClickEdit(
                            item.fullname,
                            item.username,
                            item.primary,
                            item.email,
                            item.phone,
                            item.password
                          )}
                        ></i>
                      </a>
                      <a>
                        <i
                          className='ion-android-delete admin-btn-del'
                          onClick={() => this.handleOnclickDel(item.fullname, item.username)}
                        ></i>
                      </a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {this.state.show ? (
          <form className='admin-form' onSubmit={this.onSubmit.bind(this)}>
            <h1>{this.state.fullname}</h1>
            <div className='admin-form-label'>
              <label htmlFor="name">Name</label>
              <input
                onChange={e => this.handleOnChange(e)}
                name="fullname"
                value={ this.state.fullname || this.state.user.fullname}
                type="text"
                className="form-control"
                id="name"/>
            </div>
            <div className='admin-form-label'>
              <label htmlFor="email">Email</label>
              <input
                onChange={e => this.handleOnChange(e)}
                name="email"
                value={ this.state.email || this.state.user.email}
                type="email"
                className="form-control"
                id="email"/>
            </div>
            <div className='admin-form-label'>
              <label htmlFor="phone">Phone</label>
              <input
                onChange={e => this.handleOnChange(e)}
                name="phone"
                value={ this.state.phone || this.state.user.phone }
                type="text"
                className="form-control"
                id="phone"/>
            </div>
            <div className='admin-form-label'>
              <label htmlFor="password">Password</label>
              <input
                onChange={e => {
                  this.handleOnChange(e);
                  e.target.value = '';
                }}
                name="password"
                value={ this.state.password || this.state.user.password}
                type='password'
                className="form-control"
                id="password"/>
            </div>
            <div className='admin-form-label'>
              <label htmlFor="primary">Primary</label>
              <select
                onChange={e => this.handleOnChange(e)}
                name="primary"
                value={ this.state.primary || this.state.user.primary}
                className="form-control"
                id="primary">
                <option className='option-form' value='0'>ADMIN</option>
                <option className='option-form' value='1'>Premium</option>
                <option className='option-form' value='2'>Normal</option>
              </select>
            </div>
            <div className='admin-form-btns'>
              <button className='admin-form-btn-submit' type='submit'>Submit</button>
              <button
                className='admin-form-btn-cancel'
                type='cancel'
                onClick={() => this.setState({ show: false })}
              >Cancel</button>
            </div>
          </form>
        ) : null}
      </div>
    );
  }
}

export default AdminPage;