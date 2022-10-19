import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Books from './components/Books';
import Login from './components/Login';
import apiClient, { logout_url } from './services/api';
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { getBookItems } from "./reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
    );
    const login = () => {
      setLoggedIn(true);
      sessionStorage.setItem('loggedIn', true);
    };
    const logout = () => {
    apiClient.interceptors.request.use(config => {
      config.headers['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
      return config;
    });
    apiClient.post(logout_url,[]).then(response => {
      if (response.status === 200) { //204
        Cookies.remove('access_token');
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
      }
    })
  };
  
  // const { bookItems, isLoading } = useSelector((store) => store.books);import { useDispatch, useSelector } from "react-redux";
  // const dispatch = useDispatch();

  
  // useEffect(() => {
  //   if(loggedIn){
  //     dispatch(getBookItems());
  //   }
  // }, []);
  
  const authLink = loggedIn 
  ? <button onClick={logout} className="nav-link btn btn-link">Logout</button> 
  : <NavLink to='/login' className="nav-link">Login</NavLink>;
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to='/' className="nav-link">Books</NavLink>
          </li>
          <li className="nav-item">
            {authLink}
          </li>
        </ul>
        </div>
      </nav>
      <div className="container mt-5 pt-5">
        <Switch>
          <Route path='/' exact render={props => (
            <Books {...props} loggedIn={loggedIn} />
          )} />
          <Route path='/login' render={props => (
            <Login {...props} login={login} />
          )} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
