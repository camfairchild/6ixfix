import React from 'react';

import Message from './Message';
import MessageBar from './MessageBar';
import { addMessageListener, getMessages } from '../Helper';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: {}
        }

        this.handleRecentMessage = this.handleRecentMessage.bind(this);
        // sets the listener for the messages
        addMessageListener(this.props.socket, this.handleRecentMessage);

        this.sendMessage = this.sendMessage.bind(this)
    }

    handleRecentMessage(message) {
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
        console.log(message, messages)
        this.setState({ messages })
    }

    componentDidMount() {
        getMessages(this.props.user?.userName).then((messages) => {
            this.setState({ messages })
        })
    }

    sendMessage(newMessage) {
        // TODO: remove when backend is written
        this.handleRecentMessage(newMessage)
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
                    sendMessage={this.sendMessage}
                />
            </div>
        )
    }
}