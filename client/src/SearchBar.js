import React from 'react';

export default class SearchBar extends React.Component {
    render() {
        return (
            <div className="search">
                <form action="/search" method="get">
                    <input name="query" placeholder="Search" type="text"/>
                </form>
            </div>
        )
    }
}