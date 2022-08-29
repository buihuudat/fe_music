import axios from 'axios';
import React from 'react'
import { Router } from 'react-router'

import history from './history'
import routes from './routes';

import './styles/base.sass'

const App = () => {
  axios.defaults.baseURL = 'https://buihuudat-music.herokuapp.com/'
  // axios.defaults.baseURL = 'http://localhost:5000/'
  return (
    <Router
      history={history}
      routes={routes}
      onUpdate={() => window.scrollTo(0, 0)}
    />
  )
}

export default App