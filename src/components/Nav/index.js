import axios from 'axios';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React from 'react';
import { IndexLink, Link } from 'react-router';
import { logout } from '../../actions/auth';
import { clearUserPlaylist } from '../../actions/user_playlist';
import SearchMenu from '../SearchMenu';

import './nav.sass';
const logo = require('./logo.png')

class Nav extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = { term: '', searchResult: {} };
    this.debounceSearch = debounce(this.search, 600);
  }

  search(term) {
    axios
      .get(`/api/media/search?term=${term}`)
      .then(({ data }) => {
        if (this.state.term.length) {
          this.setState({ searchResult: data });
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  handleOnChange(e) {
    const term = e.target.value;
    if (!term) return this.setState({ term: '' });
    this.setState({ term });

    return this.debounceSearch(encodeURIComponent(term));
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.searchResult.result && !nextState.term.length) {
      this.setState({ searchResult: {} });
    }
  }

  clearSearchResult() {
    this.setState({ term: '', searchResult: {} });
  }

  logOut(e) {
    e.preventDefault();
    this.props.dispatch(clearUserPlaylist());
    this.props.dispatch(logout());
    this.context.router.push('/');
  }


  render() {
    const { authenticated, user } = this.props.auth;
    
    return (
      <nav>
        <div className='nav__top'>
          <div className='searchBar'>
            <div className='search-wrapper'>
              <i className='ion-search'></i>
              <input
                type='text'
                placeholder='search for songs ...'
                value={this.state.term}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            {this.state.searchResult.msg === 'Success' && (
              <SearchMenu
                primary={user.primary}
                searchResult={this.state.searchResult}
                clearSearchResult={this.clearSearchResult.bind(this)}
              />
            )}
          </div>
        </div>
        <div className='nav__left'>
          <div className='nav_wrap'>
            <div className='logo'>
              <Link to='/'>
                <img src={logo} />
                Hao Music
              </Link>
            </div>
            {!authenticated ? (

              <div className='auth-btns'>
                <img className='auth-btns-img' src='https://cdn.dribbble.com/users/1242979/screenshots/7099165/music.gif'/>
                <div className='auth-btns-content'>
                  <Link to='/login' className='auth-btns-login'>
                    Log In
                  </Link>
                  <Link to='/signup' className='auth-btns-signup'>
                    Sign Up
                  </Link>
                </div>
              </div>
            ) : (
              <div className='user'>
                <div className='user-top'>
                  {/* <img className='auth-btns-img' src='https://media.istockphoto.com/photos/young-handsome-african-man-wearing-headphones-listening-to-music-and-picture-id1320722438?b=1&k=20&m=1320722438&s=170667a&w=0&h=7bJUiK2c6k3GaWIeUOjaJw0B090nxqlGYU_vhK300WY='/> */}
                  <img className='auth-btns-img' src={user.avatar}/>
                  <div className='user-content'>
                    <div className='user-name'>
                      {user.fullname}
                    </div>
                    <span>
                      {user.primary === '0' ?
                      'ADMIN' :
                      user.primary === '1' ?
                      'Premium' : 'Normal'}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/user/${user.username}`}
                >
                  <button className='user-profile'>View Profile</button>
                </Link>
              </div>
            )}
            <div className='navContent'>
              <ul className='nav-menu'>
                <li>
                  <IndexLink
                    to='/'
                    className='animating_link'
                    activeClassName='nav-menu-link-active'
                  >
                    <i className="ion-home"></i>
                    <span>Home</span>
                  </IndexLink>
                </li>
                <li>
                  <Link
                    to='/charts'
                    className='animating_link'
                    activeClassName='nav-menu-link-active'
                  >
                    <i className="ion-stats-bars"></i>
                    <span>Charts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/albums'
                    className='animating_link'
                    activeClassName='nav-menu-link-active'
                  >
                    <i className="ion-ios-albums"></i>
                    <span>Albums</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/artists'
                    className='animating_link'
                    activeClassName='nav-menu-link-active'
                  >
                    <i className="ion-android-people"></i>
                    <span>Artists</span>
                  </Link>
                </li>
              </ul>
              {authenticated ? (
                <div>
                <ul className='nav-playlist nav-menu'>
                  <li>
                    <IndexLink
                      to={`/playlist/${user.username}`}
                      className='animating_link'
                      activeClassName='nav-menu-link-active'
                    >
                      <i className="ion-ios-list-outline"></i>
                      <span>My Playlist</span>
                    </IndexLink>
                  </li>
                  {user.primary === '0' ? (
                    <li className='li-admin' style={{
                      border: '1px solid #00b2b3',
                      margin: '1rem 0',
                      borderRadius: '10px',
                    }}>
                      <IndexLink
                        to={'/admin-page'}
                        activeClassName='nav-menu-link-active'
                      >
                        <i style={{color: 'red'}} className="ion-android-star"></i>
                        <span>ADMIN Page</span>
                      </IndexLink>
                    </li>  
                  ) : null}
                </ul>

                {user.primary === '2' ? (
                  <div className='nav-upgrade'>
                    <span>- Limited Time Only -</span>
                    <h1>50% OFF SALE</h1>
                    <span>What will you receive ?</span>
                    <ul>
                      <li>Unlock all Songs</li>
                      <li>Unlimited song download</li>
                    </ul>
                    <button>Upgrade Now !!!</button>
                  </div>
                ) : null}
                </div>
              ) : null}

              {!authenticated ? (<div></div>) : (
                <div className='user-top-logout'>
                  <a
                    href='#'
                    title='Log Out'
                    onClick={this.logOut.bind(this)}
                  >
                    <span>logout</span>
                    <img src='/svg/sign-out-option.svg' />
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};

export default Nav;
