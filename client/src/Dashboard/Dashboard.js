import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./Dashboard.css"
import { renderPageContent } from "./renderPageContent";
import { dashboardNavigation } from "./dashboardNavigation";
import { useHistory, useLocation } from "react-router-dom";
import { useSessionStorage } from "../useSessionStorage";

export const Dashboard = () => {
    const [user, setUser] = useSessionStorage("user", {});
    const [page, setPage] = useState('user')
    const location = useLocation();
    const history = useHistory();

    // change to view by path
    const view = location.pathname.split('/')[2];
    if (['user', 'mechanic', 'client'].includes(view)) {
        setPage(view);
    }
    
    useEffect(() => {
        // run this on load
        // check if user is admin, if not redirect to login
        
        console.log(user);
        if (user.userType !== 'Admin') {
            return history.push('/login');
        }       
    }, []);

    return (
        <div className="page__wrapper">
            <Header />
            <div className="dashboard">
                <div className="dashboard__menu">
                    <div className="dashboard__menu__container">
                        {
                            dashboardNavigation.map((route, index) => (
                                <button className={route.state === page? "dashboard__btn btn__active": "dashboard__btn"} key={index} onClick={() => setPage(route.state)}>
                                    {route.name}
                                </button>
                            ))
                        }
                    </div>

                </div>
                <div className="dashboard__content">
                    <div className="content__wrapper">

                    
                   
                    {renderPageContent(page)}

                    </div>
              

                    
                </div>

            </div>

        </div>
    )
}