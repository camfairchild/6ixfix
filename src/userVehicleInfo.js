import React from "react";
import './post.css';

class UserVehicleInfo extends React.Component {

    render() {

        const { vehicleMake, vehicleModel, vehicleMileage, vehicleFuel, handleInputChange } = this.props

        return (
            <div className="textInputs">
                <input className="textInput" value={vehicleMake}
                    onChange={handleInputChange}
                    type="text"
                    name="vehicleMake"
                    placeholder="make" />


                <input className="textInput" value={vehicleModel}
                    onChange={handleInputChange}
                    type="text"
                    name="vehicleModel"
                    placeholder="model" />


                <input className="textInput"value={vehicleMileage}
                    onChange={handleInputChange}
                    type="text"
                    name="vehicleMileage"
                    placeholder="mileage" />


                <input className="textInput" value={vehicleFuel}
                    onChange={handleInputChange}
                    type="text"
                    name="vehicleFuel"
                    placeholder="fuel type" />
            </div>
        )
    }

}

export default UserVehicleInfo;