import React from 'react';
import { uid } from 'react-uid';
import { getUser } from '../Helper';
import { DELETE_ICON } from '../Icons/icons';
import { User } from './User';


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
        },
        {
            name: 'Kermit T. Frog',
            type: 'Client',
            userName: 'kermitTheFrog',
            location: 'The Muppets Studio',
            profilePic: '/images/kermit.webp',
            link: '/profile/kermitTheFrog',
            email: "kermit@disney.com"
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
                                <User user={client} />
                                <div className="delete__btn">

                                <div className='ban' onClick={() => this.banUser(client)}>{DELETE_ICON}</div>                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        )
    }
}
