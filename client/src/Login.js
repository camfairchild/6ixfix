import React from 'react';

import { useSessionStorage } from './useSessionStorage'

import { useLocation, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { login_ } from './Helper';


export default function Login(props) {
  const [user, setUser] = useSessionStorage('user', null);

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({
    userName: null,
    password: null
  });
  const [redirect, setRedirect] = React.useState(null);

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
    return new Promise(async (resolve, reject) => {
      try {

        if (!userName || !password) {
          reject({
            status: '401',
            message: 'Username or password is incorrect'
          });
        }
        const result = await login_(userName, password)
        if (result.status !== 200) {
          reject({
            status: '401',
            message: 'Username or password is incorrect'
          });
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    })
  }

  function send(event) {
    event.preventDefault();
    // sends POST to API with new signup details
    // recieves http status and profile

    callLoginAPI(userName, password).then(result => {
      setUser(({
        userName: result.data.user.userName,
        user_id: result.data.user_id,
      }));
      let redirect = {
        pathname: `/profile/${result.data.user.userName}`,
      }
      setRedirect(redirect)
    }).catch((error) => {
      console.log(error);
      setError({
        userName: error.message,
        password: error.message
      })
    });
  }

  return (
    <div className="signup-container">
      <h1>Login</h1>
      <img className="logo-img" src={process.env.PUBLIC_URL + "/images/6ixfix_logo_black.png"} />
      <form className="signup-form">
        <div className="inputName"><p>Username:</p><p>*</p></div>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleInput}
          placeholder="Choose a username:" />
        {
          error.userName ? <p className="error">Error: {error.userName}</p> : null
        }
        <div className="inputName"><p>Password:</p><p>*</p></div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInput}
          placeholder="Choose a password:" />
        {
          error.password ? <p className="error">Error: {error.password}</p> : null
        }
        <button type="submit" className="submit" onClick={send}>Login</button>
      </form>
      {redirect ? (<Redirect push to={redirect} />) : null}
      <Link to="/signup" className="signup-prompt">Don't have an account? Signup</Link>
    </div>
  );
}
