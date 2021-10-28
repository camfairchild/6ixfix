import React from 'react';
import './signup.css';
import _ from 'lodash';

import { Redirect } from 'react-router';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            userName: "",
            password: "",
            error: null
        }
    }

    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    send = (event) => {
        const newProfile = {
            type: this.state.type,
            fullName: this.state.fullName,
            userName: this.state.userName,
            password: this.state.password
        }

        // sends POST to API with new signup details
        // recieves http status and profile
        const [status, profile] = ((newProfile) => {
            if (!newProfile.password || !newProfile.userName || !newProfile.fullName) {
                return ['401', null]
            }
            return ['200', newProfile]
        })(newProfile);
        console.log(newProfile)
                
        let redirect = {
            pathname: "/"
        };

        let error;

        if (status === '200') {
            // user created successfully
            redirect = {
                pathname: "/login",
                // mock
                state: { profile: _.omit(profile, 'password'), loggedIn: newProfile }
            }
        } else {
            redirect = {
                pathname: "/",
                // error
            }
            error = `Server Error: ${status}`
        }
        
        this.setState({ redirect, error })
    }

    render() {
        const {type, img} = this.props;

        return (
            <div className="signup-form">
                <h1>Signup As A {type}:</h1>
                <img src = {img}/>
                <div className="inputName"><p>Full Name:</p><p>*</p></div>
                <input
                    type = "text"
                    name = "fullName"
                    value = {this.state.fullName}
                    onChange = {this.handleInput}
                    placeholder = "Enter your full name:"/>
                {
                    this.state.error ? <p className="error">Error: {this.state.error}</p> : null
                }
                <div className="inputName"><p>Username:</p><p>*</p></div>
                <input
                    type = "text"
                    name = "userName"
                    value = {this.state.userName}
                    onChange = {this.handleInput}
                    placeholder = "Choose a username:"/>
                {
                    this.state.error ? <p className="error">Error: {this.state.error}</p> : null
                }
                <div className="inputName"><p>Password:</p><p>*</p></div>
                <input
                    type = "text"
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.handleInput}
                    placeholder = "Choose a password:"/>
                {
                    this.state.error ? <p className="error">Error: {this.state.error}</p> : null
                }
                <button type="submit" className="submit" onClick={this.send}>Signup</button>
                { this.state.redirect ? (<Redirect push to={this.state.redirect}/>) : null }
            </div>
        )
    }
}