import React from 'react';

export default class Logo extends React.Component {
    render() {
        return(
            <div className="logo">
                <a href={this.props.href}>
                    <img src={this.props.src} alt="6ixfix Logo" />
                </a>
            </div>
        );
    }
}