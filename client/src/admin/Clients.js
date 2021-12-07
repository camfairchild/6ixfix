import React from 'react';
import { uid } from 'react-uid';
import { DELETE_ICON } from "../Icons/icons";
import { Link } from 'react-router-dom';

import { getAllClients, deleteUser } from '../Helper';
import { USER_ICON, LOCATION_ICON, EMAIL_ICON, VIEWS_ICON, CAR_ICON, SERVICE_ICON } from "../Icons/icons";
import Client from './Client';

export default class Clients extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // clients: [{
            //     name: 'Jimmy Parker',
            //     type: 'Client',
            //     userName: 'jPark23',
            //     location: 'Markham',
            //     profilePic: null,
            //     link: '/',
            //     email: "parkerj97@hotmail.com",
            //     carMake: 'Honda',
            //     carModel: 'Civic',
            //     carYear: '2012',
            //     serviceRequested: 'Oil Change',
            //     numViews: 10
            // },
            // {
            //     name: 'Nav',
            //     type: 'Client',
            //     userName: 'brownBoy1',
            //     location: 'Rexdale',
            //     profilePic: '/images/Nav.jpeg',
            //     link: '/',
            //     email: "nav@yahoo.com",
            //     carMake: 'Toyota',
            //     carModel: 'Corolla',
            //     carYear: '2007',
            //     serviceRequested: 'Brake Maintenance',
            //     numViews: 35
            // },
            // {
            //     name: 'Shawn Carter',
            //     type: 'Client',
            //     userName: 'carter97',
            //     location: 'Brampton',
            //     profilePic: null,
            //     link: '/',
            //     email: "shawn27@carter.com",
            //     carMake: 'VolksWagen',
            //     carModel: 'Jetta',
            //     carYear: '2018',
            //     serviceRequested: 'Full Inspection',
            //     numViews: 52
            // }] //make an api call to get all the clients in the system
            clients: []
        }
        this.banClient = this.banClient.bind(this);
        this.getDefaultCar = this.getDefaultCar.bind(this)
    }

    async componentDidMount() {
        const list = await getAllClients();
        console.log(list)
        const filteredList = list.filter((user) => {
            return user.fullName !== null
        })
        this.setState({
            clients: filteredList
        })
    }

    banClient = async (client) => {
        const result = await deleteUser(client._id)
        if (result !== null) {
            const list = await getAllClients();
            const filteredList = list.filter((user) => {
                return user.fullName !== null
            })
            this.setState({
                clients: filteredList
            })
        } else {
            console.log("banning error")
        }

    }
    getDefaultCar(client) {
        console.log("test")
        return client.cars.find(car => car._id = client.defaultCar)
    }

    render() {
        return (
            <div className="page__results">
                <div className='listContainer'>

                    {this.state.clients.map((client) => {
                        return (
                            <div key={uid(client)} className="result dashboard__result">
                                <div className="profile-container">
                                    <img src={client.picture !== null ? client.picture : '/images/defaultprofpic.png'} />
                                </div>
                                <div className="profile-info-container">
                                    <h4>{client.fullName}</h4>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{USER_ICON}</div>
                                        <div className='icon-text'>{client.userName}</div>
                                    </div>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{LOCATION_ICON}</div>
                                        <div className='icon-text'>{client.location}</div>
                                    </div>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{EMAIL_ICON}</div>
                                        <div className='icon-text'><a href={"mailto:" + client.email}>{client.email}</a></div>
                                    </div>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{CAR_ICON}</div>
                                        <div className='icon-text'>{(() => {
                                            const car = this.getDefaultCar(client);
                                            return car ? car?.carYear + ' ' + car?.carMake + ' ' + car?.carModel: ""
                                        })()}
                                        </div>
                                    </div>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{SERVICE_ICON}</div>
                                        <div className='icon-text'>{client.serviceRequested}</div>
                                    </div>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{VIEWS_ICON}</div>
                                        <div className='icon-text'>{client.numViews}</div>
                                    </div>
                                </div>
                                <div className="delete__btn">
                                    <div className='ban' onClick={() => this.banClient(client)}>{DELETE_ICON}</div>
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
