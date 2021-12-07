import React from 'react';
import { getFilterOptions } from './Helper';
export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptions: {}
        }
        this.submitFilter = this.submitFilter.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    componentDidMount() {
        getFilterOptions().then((filterOptions) => {
            this.setState({
                filterOptions
            });
        });
    }

    submitFilter() {
        this.props.refreshResults(this.state)
    }

    toggleFilter = (event) => {
        const currentValue = this.state.filterOptions[event.target.name]
        console.log(currentValue)
        console.log(event.target.name)
        this.setState({
            filterOptions: {
                ...this.state.filterOptions,
                [event.target.name]: !currentValue
            }
        })
    }


    render() {
        return (
            <div className="filter-container">
                {this.state.filterOptions?.fields?.map(field => (
                    <div className = "option-container">
                        <label for = {field.name}>{field.label}</label>
                        <input type="checkbox" name = {field.name}onChange = {this.toggleFilter}/>
                    </div>
                )) || <div>No fields to filter</div>}
                <input className="filter-submit" type="submit" onClick={this.submitFilter} value="Filter" />
            </div>
        )
    }
}

