import React from 'react';

import Message from './Message';
import MessageBar from './MessageBar';
import { addMessageListener, getMessages, removeMessageListener } from '../Helper';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: {},
            message_ids: []
        }

        this.handleRecentMessage = this.handleRecentMessage.bind(this);
    }

    handleRecentMessage(recentMessage) {
        // TODO: remove after sockets are implemented
        // grabs message from event
        let message = recentMessage.detail;
        const user = this.props.user;
        const messages = this.state.messages;
        if (this.state.message_ids.includes(message._id)) {
            return;
        }
        if (message.to.userName === user.userName) {
            if (message.from.userName in messages) {
                messages[message.from.userName].splice(0, 0, message)
            } else {
                messages[message.from.userName] = [message]
            }
        } else {
            if (message.to.userName in messages) {
                messages[message.to.userName].splice(0, 0, message)
            } else {
                messages[message.to.userName] = [message]
            }
        }
        this.setState({ messages, message_ids: this.state.message_ids.concat(message._id) })
    }

    componentDidMount() {
        getMessages().then((messages) => {
            const message_ids = Object.keys(messages).map((key) => {
                return messages[key].map(message => message._id)
            })
            this.setState({ messages, message_ids })
            // sets the listener for the messages
            addMessageListener(this.handleRecentMessage);
        })
    }

    componentWillUnmount() {
        removeMessageListener(this.handleRecentMessage);
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