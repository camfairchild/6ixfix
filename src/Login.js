import React from 'react';
import Header from './Header';

import { useLocation } from 'react-router';
import { Redirect } from 'react-router';

export default function Login(props) {
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

  return (
    <Header page="login"/>
  );
}
