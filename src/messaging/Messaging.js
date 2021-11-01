import React from 'react';
import { getUser } from '../Helper';

import Contacts from './Contacts';
import Messages from './Messages';
import Header from '../Header';

import './messaging.css'

export default class Messaging extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedContact: null,
            socket: null,
            user: null
        }

        this.updateSelectedContact = this.updateSelectedContact.bind(this)
    }

    componentDidMount() {
        getUser().then((user) => {
            // sets up a socketio connection with the server
            const socket = null;
            this.setState({
                socket: socket,
                user: user
            })
        })
    }

    componentWillUnmount() {
        // close socket connection
    }

    updateSelectedContact(newContact) {
        this.setState({
            selectedContact: newContact
        })
    }

    render() { 
        return (
            <div className="messaging">
                <Header page="messages" />
                <div className="messaging-container">
                    <Contacts 
                        socket={this.state.socket}
                        selectedContact={this.state.selectedContact}
                        user={this.state.user}
                        updateSelectedContact={this.updateSelectedContact} 
                    />
                    <Messages
                        socket={this.state.socket}
                        selectedContact={this.state.selectedContact}
                        user={this.state.user} 
                        messages={this.state.messages}
                    />
                </div>
            </div>
        )
    }
}