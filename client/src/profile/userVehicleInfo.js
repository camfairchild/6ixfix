import React from "react";
import './post.css';

export default class UserVehicleInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carMake: this.props.profile?.carMake,
            carModel: this.props.profile?.carModel,
            carYear: this.props.profile?.carYear,
            carMileage: this.props.profile?.carMileage,
            carFuel: this.props.profile?.carFuel
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="user-vehicle-info" key={this.props.carMake}>
                <div className="user-vehicle-info-title">
                    <h2>Vehicle Info</h2>
                </div>
                <div className="vehicle-info">
                    <div className="vehicle-make">
                        {this.props.profile?.carMake}
                    </div>
                    <div className="vehicle-model">
                        {this.props.profile?.carModel}
                    </div>
                    <div className="vehicle-year">
                        {this.props.profile?.carYear}
                    </div>
                    <div className="vehicle-mileage">
                        {this.props.profile?.carMileage}
                    </div>
                    <div className="vehicle-fuel">
                        {this.props.profile?.carFuel}
                    </div>
                </div>
                { this.props.editable ?
                <div className="textInputs">
                    <input className="textInput" value={this.state.carMake}
                        onChange={this.handleInputChange}
                        type="text"
                        name="carMake"
                        placeholder="make" />


                    <input className="textInput" value={this.state.carModel}
                        onChange={this.handleInputChange}
                        type="text"
                        name="carModel"
                        placeholder="model" />


                    <input className="textInput"value={this.state.carYear}
                        onChange={this.handleInputChange}
                        type="text"
                        name="carYear"
                        placeholder="year" />

                    <input className="textInput"value={this.state.carMileage}
                        onChange={this.handleInputChange}
                        type="text"
                        name="carMileage"
                        placeholder="mileage" />


                    <input className="textInput" value={this.state.carFuel}
                        onChange={this.handleInputChange}
                        type="text"
                        name="carFuel"
                        placeholder="fuel type" />
                    <input className="vehicle-info-submit" 
                    type="submit" value="Change Info" 
                    onClick={() => this.props.handleSubmit(this.state)} />
                </div> : null }
            </div>
        )
    }

}