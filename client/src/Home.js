import React from 'react';
import Header from './Header';
import Signup from './Signup';
import Login from './Login';
import './home.css'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header page="home"/>
        <div className="signup-page-container">
          {this.props.page === 'signup' ? <Signup /> : <Login />}
        </div>
      </div>
      
    );
  }
}
