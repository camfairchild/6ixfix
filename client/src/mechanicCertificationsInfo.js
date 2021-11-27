import React from "react";
import './post.css';

class MechanicCertificationsInfo extends React.Component {

    render() {

        const { certifications, handleInputChange } = this.props

        return (
            <div>
                <textarea value={certifications}
                    onChange={handleInputChange}
                    rows="10"
                    cols="40"
                    type="text"
                    name="mechanicSkills"
                    placeholder="Enter your skill(s)" />
            </div>
        )
    }

}

export default MechanicCertificationsInfo;