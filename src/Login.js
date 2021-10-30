import React from 'react';
import _ from 'lodash';

import { useLocation, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Signup from './Signup';

export default function Login(props) {
  const [state, setState] = React.useState({
      userName: "",
      password: "",
      error: null
  });

  const location = useLocation();
  const profile = location.state?.profile || null;
  const loggedIn = location.state?.loggedIn || null;
  
  if (loggedIn) { // a user is logged in already
    // redirect to /profile
    let redirect = {
      pathname: `/profile/${loggedIn?.userName}`,
      state: {
        profile,
        loggedIn
      }
    };
    return (
      <Redirect to={redirect} />
    );
  }

  function handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;

    setState({
        [name]: value
    });
  }

  function send(event) {
      const newProfile = {
          role: state.role,
          fullName: state.fullName,
          userName: state.userName,
          password: state.password
      }

      // sends POST to API with new signup details
      // recieves http status and profile
      const [status, profile] = ((newProfile) => {
          if (!newProfile.password || !newProfile.userName || !newProfile.fullName) {
              return ['401', null]
          }
          return ['200', newProfile]
      })(newProfile);
      console.log(newProfile)
              
      let redirect = {
          pathname: "/"
      };

      let error;

      if (status === '200') {
          // user created successfully
          redirect = {
              pathname: "/login",
              // mock
              state: { profile: _.omit(profile, 'password'), loggedIn: newProfile }
          }
      } else {
          redirect = {
              pathname: "/",
              // error
          }
          error = `Server Error: ${status}`
      }
      
      setState({ redirect, error })
  }

  return (
      <div className="signup-form">
                  <h1>Login</h1>
                  <img className="logo-img" src={process.env.PUBLIC_URL + "/images/6ixfix_logo_transparent.png"}/>
                  <div className="inputName"><p>Username:</p><p>*</p></div>
                  <input
                      type = "text"
                      name = "userName"
                      value = {state.userName}
                      onChange = {handleInput}
                      placeholder = "Choose a username:"/>
                  {
                      state.error ? <p className="error">Error: {state.error}</p> : null
                  }
                  <div className="inputName"><p>Password:</p><p>*</p></div>
                  <input
                      type = "text"
                      name = "password"
                      value = {state.password}
                      onChange = {handleInput}
                      placeholder = "Choose a password:"/>
                  {
                      state.error ? <p className="error">Error: {state.error}</p> : null
                  }
                  <button type="submit" className="submit" onClick={send}>Login</button>
                  { state.redirect ? (<Redirect push to={state.redirect}/>) : null }
                  <Link to="/signup" className="signup-prompt">Don't have an account? Signup</Link>
      </div>
  );
}
