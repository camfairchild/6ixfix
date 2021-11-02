import React from 'react';
import './signup.css';
import _ from 'lodash';

import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            userName: "",
            password: "",
            error: null,
            type: "client"
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
            role: this.state.role,
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
    printType = (event) => {
        console.log(event.target.value)
    }
    render() {
        const {type, img} = this.props;

        return (
            <div className="signup-form">
                <h1>Sign-up</h1>
                <img className="logo-img" src={process.env.PUBLIC_URL + "/images/6ixfix_logo_transparent.png"}/>
                <div className = "radio-button-container" onChange={this.handleInput}>
                    <input type = 'radio' value = 'Client' name = 'type' defaultChecked='checked'/>
                    <label for = 'type'>Client</label>
                    <input type = 'radio' value = 'Mechanic' name = 'type'/> 
                    <label for = 'type'>Mechanic</label>
                </div>
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
                <Link to="/login" className="signup-prompt">Already have an account? Login</Link>
            </div>
        )
    }
}