import React from 'react';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hourly: false,
            perJob: false,
            certified: false,
            profilePicture: false,
            within50km: false,
            dealer: false,
            private: false,
            fields: [
                {name: "hourly", label: "Charge Hourly"},
                {name: "perJob", label: "Charge Per Job"},
                {name: "certified", label: "Certified"},
                {name: "profilePicture", label: "Has Profile Picture"},
                {name: "within50km", label: "Located within 50km"},
                {name: "dealer", label: "Dealer Mechanic"},
                {name: "private", label: "Private Mechanic"},
            ]
        }
        this.submitFilter = this.submitFilter.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);

    }

    submitFilter() {
        this.props.refreshResults(this.state)
    }

    toggleFilter = (event) => {
        const currentValue = this.state[event.target.name]
        console.log(currentValue)
        console.log(event.target.name)
        this.setState({
            [event.target.name]: !currentValue
        })
        console.log(this.state)
    }


    render() {
        return (
            <div className="filter-container">
                {this.state.fields.map(field => (
                    <div className = "option-container">
                        <label for = {field.name}>{field.label}</label>
                        <input type="checkbox" name = {field.name}onChange = {this.toggleFilter}/>
                    </div>
                ))}
                <input className="filter-submit" type="submit" onClick={this.submitFilter} value="Filter" />
            </div>
        )
    }
}

