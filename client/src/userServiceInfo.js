import React from "react";
import './post.css';

class UserServiceInfo extends React.Component {

    render() {

        const { serviceNeeded, handleInputChange } = this.props

        return (
            <div className="vehicle-info">
                <textarea value={serviceNeeded}
                    onChange={handleInputChange}
                    rows="10"
                    cols="40"
                    type="text"
                    name="serviceNeeded"
                    placeholder="Enter required service(s)" />
            </div>
        )
    }

}

export default UserServiceInfo;