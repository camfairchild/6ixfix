import React from 'react';
import { uid } from 'react-uid';
import { DELETE_ICON, USER_ICON, LOCATION_ICON, CERTIFIED_ICON, EMAIL_ICON, VIEWS_ICON } from "../Icons/icons";
import { Link } from 'react-router-dom';

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
                                <div className="profile-container">
                                    <img src={mechanic.profilePic !== null ? mechanic.profilePic : '/images/defaultprofpic.png'} />
                                </div>
                                <div className="profile-info-container">
                                    <div className = 'name-container'>
                                        <h4>{mechanic.name}</h4> 
                                        {mechanic.certified ? <div className='profile-icon'>{CERTIFIED_ICON}</div> : ''}
                                    </div>
                                    <div className={ mechanic.mechType === 'Dealer' ? "user__type__tag tag__dealer" : "user__type__tag tag__private"}>{mechanic.mechType}</div>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{USER_ICON}</div>
                                        <div className='icon-text'>{mechanic.userName}</div>
                                    </div>
                                    <br />
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{LOCATION_ICON}</div>
                                        <div className='icon-text'>{mechanic.location}</div>
                                    </div>
                                    <br />
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{EMAIL_ICON}</div>
                                        <div className='icon-text'><a href={"mailto:" + mechanic.email}>{mechanic.email}</a></div>
                                    </div>
                                    <div className='icon-text-container'>
                                        <div className='profile-icon'>{VIEWS_ICON}</div>
                                        <div className='icon-text'>{mechanic.numViews}</div>
                                    </div>
                                    <br />
                                    <br/>
                                </div>
                                <div className="delete__btn">
                                    <div className='ban' onClick={() => this.banMech(mechanic)}>{DELETE_ICON}</div>
                                </div>
                                <div className="get-profile-btn-container">
                                    <Link className="profile-btn" to={`/profile/${mechanic.userName}`}>
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
