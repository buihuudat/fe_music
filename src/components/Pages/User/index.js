import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './index.sass';

class UserPage extends React.Component {
  state = {
    showInput: true,
    value: '',

    fullname: this.props.user.fullname,
    email: this.props.user.email,
    username: this.props.user.username,
    password: this.props.user.password,
    passwordConfirmation: this.props.user.password,
    phone: this.props.user.phone,
  };

  
  handleOnClick() {
    this.setState({
      showInput: !this.state.showInput,
    });
  }
  
  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault();
    const { fullname, email, username, password, passwordConfirmation, phone } = this.state;
    if (password !== passwordConfirmation) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Password and Confirm Password must be the same',
        background: '#252c48',
        color: '#fff',
      });
    } else if (password === '') {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Password is required',
        background: '#252c48',
        color: '#fff',
      });
    } else if (password.length < 6) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Password must be at least 6 characters',
        background: '#252c48',
        color: '#fff',
      });
    } else {
      // update user data
      axios.put(`/api/user/${this.props.user.username}/update`, {
        fullname,
        email,
        username,
        password,
        passwordConfirmation,
        phone,
      })
    
      .then(({ data: user }) => {
        localStorage.setItem('user', JSON.stringify(user));
        Swal.fire({
          type: 'Update Successfully !!!',
          icon: 'success',
          background: '#252c48',
          color: '#fff',
          title: 'Success',
          text: 'Your profile has been updated',
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Update Failed!!!!',
          text: `${error}`,
          icon: 'error',
          confirmButtonText: 'Try again',
          background: '#252c48',
          color: '#fff',
        });
      });
    }
  }


  render() {
    const { user } = this.props;
    const showInput = this.state.showInput;
    return (
      <div className="user-page">
        <div className='user-page-center'>
          <div className='user-page-content'>
            <div className='user-page-content-title'>Account Setting</div>
            <div className='up-content-bottom'>
              <div className='up-content-left'>
                <img src={user.avatar}/>
                <div className='up-content-left-btn'>
                  <label htmlFor="changeAvatar"><button>Change Avatar</button></label>
                  <input type="file" id="changeAvatar"/>
                </div>
              </div>
              <div className='up-content-right'>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className='up-form-label'>
                    <label htmlFor="name">Name</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      name="fullname"
                      value={ this.state.fullname || user.fullname}
                      type="text"
                      className="form-control"
                      id="name"/>
                  </div>
                  <div className='up-form-label'>
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      name="email"
                      value={ this.state.email || user.email}
                      type="email"
                      className="form-control"
                      id="email"/>
                  </div>
                  <div className='up-form-label'>
                    <label htmlFor="phone">Phone</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      name="phone"
                      value={ this.state.phone || user.phone}
                      type="text"
                      className="form-control"
                      id="phone"/>
                  </div>
                  <div className='up-form-label'>
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      onClick={e => {
                        (e.target.type = !e.target.type);
                        (e.target.value = '');
                      }}
                      disabled={showInput}
                      name="password"
                      value={ this.state.password || user.password}
                      type='password'
                      className="form-control"
                      id="password"/>
                  </div>
                  {
                    !showInput ?
                    (<div className='up-form-label'>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        onChange={e => this.handleOnChange(e)}
                        disabled={showInput}
                        name="passwordConfirmation"
                        value={ this.state.passwordConfirmation || user.password}
                        onClick={e => {
                          (e.target.type = !e.target.type);
                          (e.target.value = '');
                        }}
                        type='password'
                        className="form-control"
                        id="confirmPassword"/>
                    </div>) : null
                  }
                  <input
                    onClick={() => this.handleOnClick()}
                    type={`${!showInput ? 'button' : 'submit'}`}
                    className='up-form-submit'
                    value={`${showInput ? 'Edit' : 'Save'}`}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
