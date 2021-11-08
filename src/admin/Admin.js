import React, { useEffect } from 'react';

import { getLocation } from 'react-router-dom';

import Header from '../Header';
import { getUser } from '../Helper';
import Clients from './Clients';
import AllUsers from './allUsers';
import Mechanics from './Mechanics';

import './admin.css'

export default function Admin(props) {
    const [user, setUser] = React.useState(null);
    const [view, setView] = React.useState('clients');
    const component = {
        clients: Clients,
        mechanics: Mechanics,
        users: AllUsers
    };

    useEffect(() => {
        getUser().then(user => {
            setUser({ user });
        });
    }, []);

    const changeView = view => {
        setView(view);
        console.log(view);
    };
    
    return(
        <div className="admin-container">
            <Header page="admin" />
            <div className="admin-content">
                <div className="admin-selector">
                    {Object.keys(component).map(item => (
                        <div
                            key={item}
                            className={`selector-item ${view === item ? 'selected' : ''}`}
                            onClick={() => changeView(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <AllUsers />
            </div>
        </div>
    );
}