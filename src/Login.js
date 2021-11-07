import React from 'react';
import _ from 'lodash';

import { useLocation, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default function Login(props) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState({
        userName: null,
        password: null
    });
    const [redirect, setRedirect] = React.useState(false);

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
    switch (name) {
      case 'userName':
        setUserName(value);
        setError({
            ...error,
            userName: null
        });
        break;
      case 'password':
        setPassword(value);
        setError({
            ...error,
            password: null
        });
        break;
      default:
        break;
    }
  }

  function callLoginAPI(userName, password) {
      // calls api and returns a promise that resolves to the user object
      // and the api status code
      const mockUsers = {
        "user": {
            name: 'Client Doe',
            type: 'Client',
            userName: 'user',
            location: 'Toronto',
            profilePic: null,
            link: '/profile/user',
            email: "abc@gmail.com",
            password: "user",
        },
        "user2": {
            name: 'Mechanic Doe',
            type: 'Mechanic',
            userName: 'user2',
            location: 'Toronto',
            profilePic: null,
            link: '/profile/user2',
            email: "1234@gmail.com",
            password: "user2",
        },
        "admin": {
            name: 'Admin Doe',
            type: 'Admin',
            userName: 'admin',
            location: 'Toronto',
            profilePic: null,
            link: '/profile/admin',
            email: "admin1234@gmail.com",
            password: "admin",
        }
      }
      return new Promise((resolve, reject) => {
        const mock = mockUsers[userName];
        console.log(mock);
        if (!mock) {
            reject({
                status: '401',
                message: 'Username or password is incorrect'
            });
        } else if (mock.password !== password) {
            reject({
                status: '401',
                message: 'Username or password is incorrect'
            });
        } else {
            resolve(mock);
        }
    })
  }

  function send(event) {
      event.preventDefault();
      // sends POST to API with new signup details
      // recieves http status and profile
      
      callLoginAPI(userName, password).then(profile => {
        let redirect = {
            pathname: 'login'
        };
        // user created successfully
        redirect = {
            pathname: profile.link,
            // mock
            state: {
                profile: _.omit(profile, ['password']),
                loggedIn: profile.userName
            }
        }
        setRedirect(redirect)
      }).catch((error) => {
        setError({
            userName: error.message,
            password: error.message
        })
      });
  }

  return (
      <div className="signup-container">
                  <h1>Login</h1>
                  <img className="logo-img" src={process.env.PUBLIC_URL + "/images/6ixfix_logo_black.png"}/>
                  <form className="signup-form">
                  <div className="inputName"><p>Username:</p><p>*</p></div>
                  <input
                      type = "text"
                      name = "userName"
                      value = {userName}
                      onChange = {handleInput}
                      placeholder = "Choose a username:"/>
                  {
                      error.userName ? <p className="error">Error: {error.userName}</p> : null
                  }
                  <div className="inputName"><p>Password:</p><p>*</p></div>
                  <input
                      type = "password"
                      name = "password"
                      value = {password}
                      onChange = {handleInput}
                      placeholder = "Choose a password:"/>
                  {
                      error.password ? <p className="error">Error: {error.password}</p> : null
                  }
                  <button type="submit" className="submit" onClick={send}>Login</button>
                  </form>
                  { redirect ? (<Redirect push to={redirect}/>) : null }
                  <Link to="/signup" className="signup-prompt">Don't have an account? Signup</Link>
      </div>
  );
}
