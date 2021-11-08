import React from 'react';
import { uid } from 'react-uid';
import { getUser } from '../Helper';
import {DELETE_ICON, USER_ICON, LOCATION_ICON, CAR_ICON, SERVICE_ICON, EMAIL_ICON, VIEWS_ICON } from "../Icons/icons";
import { Link } from 'react-router-dom';



export default class Clients extends React.Component {
    state = {
        clients: [{
            name: 'Jimmy Parker',
            type: 'Client',
            userName: 'jPark23',
            location: 'Markham',
            profilePic: null,
            link: '/',
            email: "parkerj97@hotmail.com",
            carMake: 'Honda',
            carModel: 'Civic',
            carYear: '2012',
            serviceRequested: 'Oil Change',
            numViews: 10
        },
        {
            name: 'Nav',
            type: 'Client',
            userName: 'brownBoy1',
            location: 'Rexdale',
            profilePic: '/images/Nav.jpeg',
            link: '/',
            email: "nav@yahoo.com",
            carMake: 'Toyota',
            carModel: 'Corolla',
            carYear: '2007',
            serviceRequested: 'Brake Maintenance',
            numViews: 35
        },
        {
            name: 'Shawn Carter',
            type: 'Client',
            userName: 'carter97',
            location: 'Brampton',
            profilePic: null,
            link: '/',
            email: "shawn27@carter.com",
            carMake: 'VolksWagen',
            carModel: 'Jetta',
            carYear: '2018',
            serviceRequested: 'Full Inspection',
            numViews: 52
        }] //make an api call to get all the clients in the system
    }

    banClient = (client) => {
        const clientList = this.state.clients.filter((c) => {
            return c !== client
        })
        this.callAPIBan(client, this.state.loggedIn).then((result) => {
            const { status, message } = result;
            if (status === 200) {
                this.setState({
                    clients: clientList
                })
            } else {
                // error
                console.log("error")
            }
        })
    }
    callAPIBan = (client, admin) => {
        console.log("banning user")
        return new Promise((resolve, reject) => {
            resolve([200, ""]);
        })
    }

    componentDidMount() {
        getUser().then((user) => {
            this.setState({
                loggedIn: user
            })
        })
    }


    render() {
        return (
            <div className="page__results">
                <div className='listContainer'>

                    {this.state.clients.map((client) => {
                        return (
                            <div key={uid(client)} className="result dashboard__result">
                                <div className="profile-container">
                                    <img src={client.profilePic !== null ? client.profilePic : '/images/defaultprofpic.png'} />
                                </div>
                                <div className="profile-info-container">
                                    <h4>{client.name}</h4>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{USER_ICON}</div>
                                        <div className='icon-text'>{client.userName}</div>
                                    </div>
                                    <br/>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{LOCATION_ICON}</div>
                                        <div className='icon-text'>{client.location}</div>
                                    </div>
                                    <br/>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{EMAIL_ICON}</div>
                                        <div className='icon-text'><a href={"mailto:" + client.email}>{client.email}</a></div>
                                    </div>
                                    <br/>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{CAR_ICON}</div>
                                        <div className='icon-text'>{client.carYear +' '+ client.carMake +' '+client.carModel}</div>
                                    </div>
                                    <br/>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{SERVICE_ICON}</div>
                                        <div className='icon-text'>{client.serviceRequested}</div>
                                    </div>
                                    <br/>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{VIEWS_ICON}</div>
                                        <div className='icon-text'>{client.numViews}</div>
                                    </div>
                                    <br/>
                                </div>
                                <div className="delete__btn">
                                    <div className='ban' onClick={() => this.banUser(client)}>{DELETE_ICON}</div> 
                                </div>

                                <div className="get-profile-btn-container">
                                    <Link className="profile-btn" to={`/profile/${client.userName}`}>
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
