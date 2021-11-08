import React from 'react';
import { uid } from 'react-uid';
import {DELETE_ICON, USER_ICON, LOCATION_ICON, EMAIL_ICON } from "../Icons/icons";
import {Link} from "react-router-dom";

import { getUser } from '../Helper';

export default class AllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{
                name: 'John Doe',
                type: 'Mechanic',
                userName: 'jDoe123',
                location: 'Toronto',
                profilePic: null,
                link: '/',
                email: "abc@gmail.com"
            },
            {
                name: 'Nav',
                type: 'Client',
                userName: 'brownBoy1',
                location: 'Rexdale',
                profilePic: '/images/Nav.jpeg',
                link: '/',
                email: "nav@yahoo.com"
            },
            {
                name: 'Jimmy Parker',
                type: 'Client',
                userName: 'jPark23',
                location: 'Markham',
                profilePic: null,
                link: '/',
                email: "parkerj97@hotmail.com"
            },
            {
                name: 'Drake',
                type: 'Mechanic',
                userName: 'drizzy86',
                location: 'Degrassi',
                profilePic: '/images/Drake-Profile-Pic.png',
                link: '/',
                email: "drake@ovo.com"
            },
            {
                name: 'Shawn Carter',
                type: 'Client',
                userName: 'carter97',
                location: 'Brampton',
                profilePic: null,
                link: '/',
                email: "shawn27@carter.com"
            },
            {
                name: 'Kenneth Crane',
                type: 'Mechanic',
                userName: 'craneK78',
                location: 'Waterloo',
                profilePic: null,
                link: '/',
                email: "kenneth@crane.com"
            }] //make an api call to get all the users in the system
        }

        this.banUser = this.banUser.bind(this);
        this.callAPIBan = this.callAPIBan.bind(this);
    }

    banUser = (user) => {
        const userList = this.state.users.filter((u) => {
            return u !== user
        })
        console.log(user)
        this.callAPIBan(user, this.state.loggedIn).then((result) => {
            const { status, message } = result;
            console.log(status)
            if (status === 200) {
                this.setState({
                    users: userList
                })
            } else {
                // error
                console.log("error")
            }
        })
    }

    callAPIBan = (user, admin) => {
        console.log("banning user")
        return new Promise((resolve, reject) => {
            resolve([200, ""]);
        })
    }

    render() {
        return (
            <div className="page__results">
                <div className='listContainer'>

                    {this.state.users.map((user) => {
                        return (
                            <div key={uid(user)} className="result dashboard__result">
                                <div className="profile-container">
                                    <img src={user.profilePic !== null ? user.profilePic : '/images/defaultprofpic.png'} />
                                </div>
                                <div className="profile-info-container">
                                    <h4>{user.name}</h4>
                                    <div className={ user.type === 'Mechanic' ? "user__type__tag tag__mechanic" : "user__type__tag tag__client"}>{user.type}</div>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{USER_ICON}</div>
                                        <div className='icon-text'>{user.userName}</div>
                                    </div>
                                    <br/>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{LOCATION_ICON}</div>
                                        <div className='icon-text'>{user.location}</div>
                                    </div>
                                    <br/>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{EMAIL_ICON}</div>
                                        <div className='icon-text'><a href={"mailto:" + user.email}>{user.email}</a></div>
                                    </div>
                                    {/* <div className="profile-icon">{USER_ICON} {user.userName}</div>
                                    <br/>
                                    <div className='profile-icon'>{LOCATION_ICON} {user.location}</div>
                                    <div className='profile-icon'>{EMAIL_ICON}<a href={"mailto:" + user.email}>{user.email}</a></div> */}
                                </div>

                                <div className="delete__btn">
                                    <div className='ban' onClick={() => this.banUser(user)}>{DELETE_ICON}</div>
                                </div>
                                <div className="get-profile-btn-container">
                                    <Link className="profile-btn" to={`/profile/${user.userName}`}>
                                        Continue to profile
                                    </Link>
                                </div>
                                
                            </div>
                        )
                    })}

                </div>
            </div>

        )
    }
}
