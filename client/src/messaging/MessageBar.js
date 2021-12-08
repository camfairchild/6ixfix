import React from "react";

import { sendMessage } from '../Helper';

export default class MessageBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newMessage: ""
        }

        this.onChange = this.onChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    onChange(e) {
        this.setState({
            newMessage: e.target.value
        })
    }

    sendMessage(e) {
        e.preventDefault()
        if (this.state.newMessage === "" || !this.props.selectedContact) {
            return
        }
        const newMessage = {
            message: this.state.newMessage,
            to: this.props.selectedContact,
            from: this.props.user?.userName,
            time_: new Date() // TODO: should be verified on server
        }
        sendMessage(newMessage).then((result) => {
            const [status, message] = result;
            if (status === '200') {
                // success, message sent
                // clear field

                this.setState({
                    newMessage: ""
                })
            }
        }).catch((err) => {
            // handle error
            console.log(err)
        })
    }

    render() {
        return(
                <form className="messagebar-container" onSubmit={this.sendMessage} >
                    <input
                        className="messagebar-input"
                        type="text"
                        onChange={this.onChange}
                        value={this.state.newMessage}
                        placeholder="Send Message"
                    />
                    <input 
                        className="messagebar-send"
                        type="submit"
                        value=""
                    />
                </form>
        )
    }
}