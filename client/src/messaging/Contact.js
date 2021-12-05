import React from 'react';

import ProfilePic from '../profile/ProfilePic';
import { formatTime } from '../Helper';

export default class Contact extends React.Component {

    render() {
        let { message, from, time_ } = this.props.mostRecentMessage;
        if (from !== this.props.contact.userName) {
            from = "me";
        }
        time_ = formatTime(time_)
        return (
            <div
                className={`contact-container ${this.props.selected ? "selected-contact" : ""}`}
                onClick={this.props.onClick}>
                <div className="contact-details">
                    <ProfilePic user={this.props.contact} editable={false} />
                    <div className="contact-userName" >
                        {this.props.contact.userName}
                    </div>
                </div>
                <div className="contact-lastMessage">
                    <div className="contact-from">
                        {from}:
                    </div>
                    <div className="contact-message">
                        {message}
                    </div>
                    <div className="contact-time">
                        {time_}
                    </div>
                </div>
            </div>
        )
    }
}