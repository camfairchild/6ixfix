import React from 'react';

import Contacts from './Contacts';
import Messages from './Messages';
import Header from '../Header';

import { Redirect } from 'react-router';
import { useSessionStorage } from '../useSessionStorage'
import './messaging.css'

export default function Messaging(props) {
    const [selectedContact, setSelectedContact] = React.useState(null);
    const [user, setUser] = useSessionStorage('user', null);
    const loggedIn = (user !== null);

    function updateSelectedContact(newContact) {
        setSelectedContact(newContact);
    }

    return (
        <div className="messaging">
            <Header page="messages" />
            <div className="messaging-container">
                <Contacts 
                    selectedContact={selectedContact}
                    user={user}
                    updateSelectedContact={updateSelectedContact} 
                />
                <Messages
                    selectedContact={selectedContact}
                    user={user} 
                />
                { loggedIn === false && <Redirect to="/login" /> }
            </div>
        </div>
    )
    
}