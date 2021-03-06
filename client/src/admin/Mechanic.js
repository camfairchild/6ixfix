import React from 'react';

import { USER_ICON, LOCATION_ICON, CERTIFIED_ICON, EMAIL_ICON, VIEWS_ICON } from "../Icons/icons";
import { Link } from 'react-router-dom';

export default function Mechanic(props) {
    const [mechanic, setMechanic] = React.useState(props.mechanic);

    return (
        <div className="result dashboard__result">
            <div className="profile-container">
                <img src={mechanic.picture !== null ? mechanic.picture : '/images/defaultprofpic.png'} />
            </div>
            <div className="profile-info-container">
                <div className='name-container'>
                    <h4>{mechanic.fullName}</h4>
                    {mechanic.certified ? <div className='profile-icon'>{CERTIFIED_ICON}</div> : ''}
                </div>
                <div className={mechanic.mechType === 'Dealer' ? "user__type__tag tag__dealer" : "user__type__tag tag__private"}>{mechanic.mechType}</div>
                <div className='icon-text-container'>
                    <div className='profile-icon'>{USER_ICON}</div>
                    <div className='icon-text'>{mechanic.userName}</div>
                </div>
                <div className='icon-text-container'>
                    <div className='profile-icon'>{LOCATION_ICON}</div>
                    <div className='icon-text'>{mechanic.location}</div>
                </div>
                <div className='icon-text-container'>
                    <div className='profile-icon'>{EMAIL_ICON}</div>
                    <div className='icon-text'><a href={"mailto:" + mechanic.email}>{mechanic.email}</a></div>
                </div>
                <div className='icon-text-container'>
                    <div className='profile-icon'>{VIEWS_ICON}</div>
                    <div className='icon-text'>{mechanic.numViews}</div>
                </div>
            </div>
            <div className="get-profile-btn-container">
                <Link className="profile-btn" to={`/profile/${mechanic.userName}`}>
                    Continue to profile
                </Link>
            </div>
        </div>
    )

}