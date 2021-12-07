import React from 'react';

import { USER_ICON, LOCATION_ICON, EMAIL_ICON, VIEWS_ICON, CAR_ICON, SERVICE_ICON } from "../Icons/icons";
import { Link } from 'react-router-dom';

export default function Client(props) {


    const getDefaultCar = (client) => {
        return client.cars.find(car => car._id = client.defaultCar)
    }

    const [client, setClient] = React.useState(props.client);
    return (
        <div className="result dashboard__result">
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
                        const car = getDefaultCar(client);
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
            <div className="get-profile-btn-container">
                <Link className="profile-btn" to={`/profile/${client.userName}`}>
                    Continue to profile
                </Link>
            </div>
        </div>
    )
}