import React from 'react';
import { uid } from 'react-uid';
import {DELETE_ICON } from "../Icons/icons";
import { Link } from 'react-router-dom';

import { getAllClients, deleteUser } from '../Helper';
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

    render() {
        return (
            <div className="page__results">
                <div className='listContainer'>

                    {this.state.clients.map((client) => {
                        return (
                            <div key={uid(client)} className="result dashboard__result">
                                <Client client={client}/>
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
