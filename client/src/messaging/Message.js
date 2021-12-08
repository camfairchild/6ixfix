import React from "react";
import { formatTime } from "../Helper";

export default class Message extends React.Component {
    render() {
        let { message, from, to, time_ } = this.props.message;
        const userName = this.props.user?.userName;
        let sent = false;
        if (from.userName === userName || from.userName === "" ) {
            from = "me";
            sent = true;
        }
        time_ = formatTime(time_)
        return (
            <div className={`message-container ${sent ? "sent" : "recieved"}`}>
                <div className="message-from">
                    {from.userName}
                </div>
                <div className="message-timestamp">
                    {time_}
                </div>
                <div className="message-content">
                    {message}
                </div>
            </div>
        )
    }
}