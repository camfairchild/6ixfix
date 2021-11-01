import React from 'react';

import { getMostRecentMessages, addMessageListener, getContacts } from '../Helper';
import Contact from './Contact';

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            mostRecentMessages: {},
        }

        this.handleRecentMessage = this.handleRecentMessage.bind(this);
        // sets the listener for the new messages and updates the state
        addMessageListener(this.props.socket, this.handleRecentMessage);
    }

    componentDidMount() {
        const userName = this.props.user?.userName;
        getContacts(userName).then((contacts) => {
            getMostRecentMessages(userName).then((mostRecentMessages) => {
                this.setState({
                    contacts,
                    mostRecentMessages
                })
            })
        })
    }

    handleRecentMessage(message) {
        // update contacts list with the new last message
        let contact;
        if (message.from === this.props.user.userName) {
            contact = this.message.to;
        } else if (message.to === this.props.user.userName) {
            contact = this.message.from;
        }
        let mostRecentMessages = this.state.mostRecentMessages;
        mostRecentMessages[contact] = message;
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
                        return (
                            <Contact
                                key={index}
                                contact={contact}
                                mostRecentMessage={this.state.mostRecentMessages[contact.userName]}
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