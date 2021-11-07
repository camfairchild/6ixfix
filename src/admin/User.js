import React from "react";
import _ from "lodash";

import {USER_ICON } from "../Icons/icons";

export class User extends React.Component {
    constructor(props) {
        super(props);

        this.headings = {
            "userName": "Username:",
            "location": "Location:",
            "email": "Email:",
            "carMake": "Car Make:",
            "carModel": "Car Model:",
            "carYear": "Car Year:",
            "serviceRequested": "Service Requested:",
            "numViews": "Number of Views:",
            "mechType": "Dealer or Private:",
            "certified": "Certified:"
        }
    }
    

    render() {
        const user = this.props.user;
        let keys = Object.keys(user);
        let headings = this.headings;
        keys = _.intersection(_.keys(headings), keys);
        console.log(keys);
        return (
            <div className="profile-result">
                <div className="profile-container">
                    <img src={user.profilePic !== null ? user.profilePic : '/images/defaultprofpic.png'} />
                </div>
                <div className="profile-info-container">
                    <h4>{user.name}</h4>
                    { this.props.showTags ? <div>
                    <div className={user.type === 'Mechanic' ? "user__type__tag tag__mechanic" : "user__type__tag tag__client"}>{user.type}</div>
                    <div className="profile-user">{USER_ICON} {user.userName}</div></div> : null
                    }
                    {keys.map((label, index) => {
                        return (
                            <div key={index} className="cat-container">
                                <div className="catHeading">{this.headings[label]}</div>
                                <div>{ label === "email" ? <a href={"mailto:" + user.email}>{user.email}</a>: user[label].toString()}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}