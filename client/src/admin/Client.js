import React from 'react';

import { USER_ICON, LOCATION_ICON, EMAIL_ICON, VIEWS_ICON, CAR_ICON, SERVICE_ICON } from "../Icons/icons";

export default function Client(props) {


    const getDefaultCar = (client) => {
        return client.cars.find(car => car._id = client.defaultCar)
    }

    const [client, setClient] = React.useState(props.client);
    return (
        <div>
            <div className="profile-container">
                                    <img src={client.picture !== null ? client.picture : '/images/defaultprofpic.png'} />
                                </div>
                                <div className="profile-info-container">
                                    <h4>{client.fullName}</h4>
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
                                        <div className='icon-text'>{() => {
                                            const car = getDefaultCar(client);
                                            return car.carYear+' '+ car.carMake +' '+ car.carModel
                                        }}
                                        </div>
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
        </div>
    )
}