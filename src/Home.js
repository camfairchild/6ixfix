import React from 'react';
import Header from './Header';
import Signup from './Signup';
import './home.css'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header page="home"/>
        <div className="signup-container">
          <Signup type="Client" img='/images/valerie-kaarna-YsutjEqmLWo-unsplash.jpg'></Signup>
          <Signup type="Mechanic" img='/images/aaron-huber-KxeFuXta4SE-unsplash.jpg'></Signup>
        </div>
        
      </div>
      
    );
  }
}
