import React from "react";
import './post.css';

class MechanicSkillsInfo extends React.Component {

    render() {

        const { skills, handleInputChange } = this.props

        return (
            <div>
                <textarea value={skills}
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

export default MechanicSkillsInfo;