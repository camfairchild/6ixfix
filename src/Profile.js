import React from 'react';
import Header from './Header';

import { useLocation, useParams } from 'react-router';

export default function Profile(props) {
    const location = useLocation();
    
    const params = useParams();
    let userName = params['userName'] || null;

    function getLoggedIn() {
        return location.state?.loggedIn
    }

    function getUserProfile(userName) {
        // makes API call to get profile based on userName
        
        const payload = {
            userName
        }
        console.log("Makes API Call:", payload);

        // mock data recieved from state
        const profile = location.state?.profile || {
            userName: "jsmith123",
            fullName: "John Smith"
        };
        return profile
    }

    const profile = getUserProfile(userName);
    const loggedIn = getLoggedIn();

    if (loggedIn) { // a user is logged in already
        // switch view based on loggedIn
    }
  
    return (
        <div className="profilePage">
            <Header page="login"/>
            <p>Welcome {userName}!</p>
        </div>
    );
  }