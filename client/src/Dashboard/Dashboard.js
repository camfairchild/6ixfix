import React, { useState } from "react";
import Header from "../Header";
import "./Dashboard.css"
import { renderPageContent } from "./renderPageContent";
import { dashboardNavigation } from "./dashboardNavigation";

export const Dashboard = () => {

    const [page, setPage] = useState('user')

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