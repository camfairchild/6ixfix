import React from 'react';

import Message from './Message';
import MessageBar from './MessageBar';
import { addMessageListener, getMessages, removeMessageListener } from '../Helper';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: {}
        }

        this.handleRecentMessage = this.handleRecentMessage.bind(this);
    }

    handleRecentMessage(recentMessage) {
        // TODO: remove after sockets are implemented
        // grabs message from event
        let message = recentMessage.detail; 

        const user = this.props.user;
        const messages = this.state.messages;
        if (message.to === user.userName) {
            if (message.from in messages) {
                messages[message.from].splice(0, 0, message)
            } else {
                messages[message.from] = [message]
            }
        } else {
            if (message.to in messages) {
                messages[message.to].splice(0, 0, message)
            } else {
                messages[message.to] = [message]
            }
        }
        console.log("message:", message)
        this.setState({ messages })
    }

    componentDidMount() {
        getMessages(this.props.user?.userName).then((messages) => {
            this.setState({ messages })
            // sets the listener for the messages
            addMessageListener(this.props.socket, this.handleRecentMessage);
        })
    }

    componentWillUnmount() {
        removeMessageListener(this.props.socket, this.handleRecentMessage);
    }

    render() {
        return (
            <div className="messages-container">
                <div className="messages">
                    {(this.state.messages[this.props.selectedContact] || []).map((message, index) => {
                        return (
                            <Message key={index} message={message} user={this.props.user}/>
                        )
                    })}
                </div>
                <MessageBar 
                    key={this.props.selectedContact}
                    socket={this.props.socket}
                    selectedContact={this.props.selectedContact}
                    user={this.props.user} 
                />
            </div>
        )
    }
}