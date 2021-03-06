import React from 'react';

export default class NavButton extends React.Component {
    render() {
        return(
            <div className="navbutton">
                <a href={this.props.href} onClick={this.props.onClick}>{this.props.children}</a>
            </div>
        );
    }
}