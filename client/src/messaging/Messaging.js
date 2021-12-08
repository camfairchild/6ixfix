import React, { useEffect } from 'react';

import Contacts from './Contacts';
import Messages from './Messages';
import Header from '../Header';

import { Redirect, useHistory, useParams } from 'react-router';
import { useSessionStorage } from '../useSessionStorage'
import './messaging.css'
import { startPollingForMessages, stopPollingForMessages, checkSession } from '../Helper';

export default function Messaging(props) {
    const [selectedContact, setSelectedContact] = React.useState(null);
    const [user, setUser] = useSessionStorage('user', null);
    const interval = React.useRef(null);
    const history = useHistory()

    // check if userName in url
    const { userName } = useParams()
    if (userName) {
        setSelectedContact(userName)
    }

    function updateSelectedContact(newContact) {
        setSelectedContact(newContact);
    }

    useEffect(() => {
        checkSession().then(result => {
            // check logged in
            console.log("checked session", result)
            if (!result) {
                history.push('/login')
            } else {
                const interval = startPollingForMessages()

                return () => {
                    // cleanup, run on unmount
                    stopPollingForMessages(interval)
                }
            }
        })
    }, [])

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
            </div>
        </div>
    )

}