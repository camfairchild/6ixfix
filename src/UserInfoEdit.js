import React from "react";

import _ from "lodash";

export default class UserInfoEdit extends React.Component {
        constructor(props) {
            super(props);
            const goodKeys = [
                "location",
                "fullName",
                "serviceRequested",
                "rate",
                "bio",
                "mechType"
            ]
            const remove = Object.keys(this.props.profile || {})
            this.state = _.omit(this.props.profile, _.difference(remove, goodKeys))

            this.handleInputChange = this.handleInputChange.bind(this);
        };

        handleInputChange(event) {
            const { name, value } = event.target;
            this.setState({
                [name]: value
            });
        }
    
        render() {
            return (
                <div className="user-vehicle-info" key={this.props.bio}>
                    { this.props.editable ?
                    <div className="textInputs">
                        {Object.keys(this.state).map((item, index) => {
                            return (
                                <input className="textInput" value={this.state[item]}
                                onChange={this.handleInputChange}
                                type="text"
                                name={item}
                                placeholder={item} />
                            )
                        })}
    
    
                        <input className="vehicle-info-submit" 
                        type="submit" value="Change Info" 
                        onClick={() => this.props.handleSubmit(this.state)} />
                    </div> : null }
                </div>
            )
        }
    
    }