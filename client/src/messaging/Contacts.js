import React from 'react';

import { getMostRecentMessages, addMessageListener, getContacts, removeMessageListener } from '../Helper';
import Contact from './Contact';

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            mostRecentMessages: {},
        }

        this.handleRecentMessage = this.handleRecentMessage.bind(this);
    }

    componentDidMount() {
        getContacts().then((contacts) => {
            getMostRecentMessages().then((mostRecentMessages) => {
                this.setState({
                    contacts,
                    mostRecentMessages
                })
                
            // sets the listener for the new messages and updates the state
            addMessageListener(this.handleRecentMessage);
            })
        })
    }

    componentWillUnmount() {
        // removes the listener for the new messages and updates the state
        removeMessageListener(this.handleRecentMessage);
    }

    handleRecentMessage(recentMessage) {
        // TODO: remove after sockets are implemented
        // grabs message from event
        let message = recentMessage.detail; 

        // update contacts list with the new last message
        let contact;
        if (message.from.userName === this.props.user?.userName) {
            contact = message.to.userName;
        } else if (message.to.userName === this.props.user?.userName) {
            contact = message.from.userName;
        }
        let mostRecentMessages = this.state.mostRecentMessages;
        mostRecentMessages[contact] = [message];
        this.setState({
            mostRecentMessages
        })
    }

    updateSelectedContact(contact) {
        return (e) => {
            this.props.updateSelectedContact(contact.userName)
        }
    }

    render() {
        return (
            <div className="contacts-container">
                <div className="contacts">
                    {this.state.contacts.map((contact, index) => {
                        if (!this.state.mostRecentMessages[contact.userName]) {
                            return(null);
                        }
                        console.log(contact.userName)
                        return (
                            <Contact
                                key={index}
                                contact={contact}
                                mostRecentMessage={this.state.mostRecentMessages[contact.userName][0]}
                                selected={contact.userName === this.props.selectedContact}
                                onClick={this.updateSelectedContact(contact)}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}