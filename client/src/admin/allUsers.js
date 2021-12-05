import React from 'react';
import { uid } from 'react-uid';
import {DELETE_ICON, USER_ICON, LOCATION_ICON, EMAIL_ICON } from "../Icons/icons";
import {Link} from "react-router-dom";

import { getAllProfiles, deleteUser } from '../Helper';

export default class AllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // users: [{
            //     fullName: 'John Doe',
            //     userType: 'Mechanic',
            //     userName: 'jDoe123',
            //     location: 'Toronto',
            //     picture: null,
            //     link: '/',
            //     email: "abc@gmail.com"
            // },
            // {
            //     fullName: 'Nav',
            //     userType: 'Client',
            //     userName: 'brownBoy1',
            //     location: 'Rexdale',
            //     picture: '/images/Nav.jpeg',
            //     link: '/',
            //     email: "nav@yahoo.com"
            // },
            // {
            //     fullName: 'Jimmy Parker',
            //     userType: 'Client',
            //     userName: 'jPark23',
            //     location: 'Markham',
            //     picture: null,
            //     link: '/',
            //     email: "parkerj97@hotmail.com"
            // },
            // {
            //     fullName: 'Drake',
            //     userType: 'Mechanic',
            //     userName: 'drizzy86',
            //     location: 'Degrassi',
            //     picture: '/images/Drake-Profile-Pic.png',
            //     link: '/',
            //     email: "drake@ovo.com"
            // },
            // {
            //     fullName: 'Shawn Carter',
            //     userType: 'Client',
            //     userName: 'carter97',
            //     location: 'Brampton',
            //     picture: null,
            //     link: '/',
            //     email: "shawn27@carter.com"
            // },
            // {
            //     fullName: 'Kenneth Crane',
            //     userType: 'Mechanic',
            //     userName: 'craneK78',
            //     location: 'Waterloo',
            //     picture: null,
            //     link: '/',
            //     email: "kenneth@crane.com"
            // }] //make an api call to get all the users in the system
            users: []
        }

        this.banUser = this.banUser.bind(this);
    }
    async componentDidMount() {
        const list = await getAllProfiles();
        console.log(list)
        const filteredList = list.filter((user) => {
            return user.fullName !== null
        })
        console.log(filteredList)
        this.setState({
            users: filteredList
        })
    }

    banUser = async (user) => {
        console.log(user._id)
        const result = await deleteUser(user._id)
        if (result !== null) {
            const list = await getAllProfiles();
            const filteredList = list.filter((user) => {
                return user.fullName !== null
            })
            this.setState({
                users: filteredList
            })
        } else {
            console.log("banning error")
        }

    }

    

    render() {
        return (
            <div className="page__results">
                <div className='listContainer'>

                    {this.state.users.map((user) => {
                        return (
                            <div key={uid(user)} className="result dashboard__result">
                                <div className="profile-container">
                                    <img src={user.picture !== null ? user.picture : '/images/defaultprofpic.png'} />
                                </div>
                                <div className="profile-info-container">
                                    <h4>{user.fullName}</h4>
                                    <div className={ user.userType === 'Mechanic' ? "user__type__tag tag__mechanic" : "user__type__tag tag__client"}>{user.userType}</div>
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
