import React from "react";
import './post.css';

class UserVehicleInfo extends React.Component {

    render() {

        const { vehicleMake, vehicleModel, vehicleMileage, vehicleFuel, handleInputChange } = this.props

        return (
            <div>
                <input value={vehicleMake}
                    onChange={handleInputChange}
                    type="text"
                    name="vehicleMake"
                    placeholder="make" />


                <input value={vehicleModel}
                    onChange={handleInputChange}
                    type="text"
                    name="vehicleModel"
                    placeholder="model" />


                <input value={vehicleMileage}
                    onChange={handleInputChange}
                    type="text"
                    name="vehicleMileage"
                    placeholder="mileage" />


                <input value={vehicleFuel}
                    onChange={handleInputChange}
                    type="text"
                    name="vehicleFuel"
                    placeholder="fuel type" />
            </div>
        )
    }

}

export default UserVehicleInfo;