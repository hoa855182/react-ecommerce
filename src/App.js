import axios from 'axios';
import React from 'react'
import './App.css'


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainContent from './layout/admin/MainLayout.jsx'
import Home from './components/frontend/Home'
import Login from './components/frontend/auth/Login'
import Register from './components/frontend/auth/Register'

axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type']='application/json'
axios.defaults.headers.post['Accept']='application/json'
axios.defaults.baseURL="http://localhost:8000/"

axios.interceptors.request.use(
  function(config){
    const token = localStorage.getItem('auth_token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  }
)

function App() {
  return (
    <div>
       <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Login" component={Register}/>
          <Route path="/admin" name ="Admin" render={(props) => <MainContent {...props}/> } />
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
