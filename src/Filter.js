import React from 'react';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterField1: true,
            filterField2: false,
        }
    }

    submitFilter() {
        this.props.refreshResults(this.state)
    }

    render() {
        return (
            <div className="filter-container">
                <input className="filter-submit" type="submit" onClick={this.submitFilter} />
            </div>
        )
    }
}