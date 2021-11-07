import React from 'react';
import { uid } from 'react-uid';
import { DELETE_ICON } from '../Icons/icons';

import { User } from './User';

export default class Mechanics extends React.Component {
    state = {
        mechanics: [{
            name: 'John Doe',
            type: 'Mechanic',
            userName: 'jDoe123',
            location: 'Toronto',
            profilePic: null,
            link: '/',
            email: "abc@gmail.com",
            mechType: 'Private',
            certified: true, //can also potentially have a list of certifications based on the profile
            numViews: 32
        },
        {
            name: 'Kenneth Crane',
            type: 'Mechanic',
            userName: 'craneK78',
            location: 'Waterloo',
            profilePic: null,
            link: '/',
            email: "kenneth@crane.com",
            mechType: 'Dealer', //include dealer info?
            certified: true,
            numViews: 27
        },
        {
            name: 'Drake',
            type: 'Mechanic',
            userName: 'drizzy86',
            location: 'Degrassi',
            profilePic: '/images/Drake-Profile-Pic.png',
            link: '/',
            email: "drake@ovo.com",
            mechType: 'Private',
            certified: false,
            numViews: 52
        }] //make an api call to get all the mechanics in the system
    }

    banMech = (mechanic) => {
        const mechList = this.state.mechanics.filter((mech) => {
            return mech !== mechanic
        })
        this.setState({ //we also want to make an api call sending the new mech list to the server
            mechanics: mechList
        })
    }

    render() {
        return (
            <div className="page__results">
                <div className='listContainer'>

                    {this.state.mechanics.map((mechanic) => {
                        return (
                            <div key={uid(mechanic)} className="result dashboard__result">
                                 <User user={mechanic} />
                               
                                <div className="delete__btn">
                                <div className='ban' onClick={() => this.banMech(mechanic)}>{DELETE_ICON}</div>
                                </div>
                              
                            </div>
                        )
                    })}

                </div>
            </div>

        )
    }
}
