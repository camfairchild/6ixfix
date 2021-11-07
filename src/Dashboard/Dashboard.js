import React, { useState } from "react";
import _ from "lodash";

import Header from "../Header";
import "./Dashboard.css"
import { renderPageContent } from "./renderPageContent";
import { dashboardNavigation } from "./dashboardNavigation";
import { useParams } from "react-router";

export const Dashboard = () => {
    let view = useParams()['view']
    view = _.map(dashboardNavigation, 'state').includes(view) ? view : 'user'
    const [page, setPage] = useState(view)

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