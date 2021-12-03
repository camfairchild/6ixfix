import React from 'react';
import './signup.css';

import { Redirect } from 'react-router';
import { validate as validateEmail } from 'email-validator';
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

import { signup_ } from './Helper';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            email: "",
            confirmPassword: "",
            error: {
                password: "",
                username: "",
                email: "",
                confirm: ""
            },
            type: "client",
            redirect: null
        }
    }

    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let error = this.state.error;
        error[name] = "";
        this.setState({
            [name]: value,
            error: error
        });
    }

    callSignupAPI = (newProfile) => {
        // mock api call to signup POST endpoint
        // 403 - username already exists
        // 403 - email already exists
        // 400 - invalid email
        // 400 - invalid password
        // 400 - passwords don't match
        // 200 - success
        // 500 - server error
        return new Promise(async (resolve, reject) => {
            if (!newProfile.password || !newProfile.userName || !newProfile.email || !newProfile.role) {
                reject({
                    status: '401',
                    message: 'Missing required fields'
                });
            }
            const { userName, password, email, confirmPassword, role: type } = newProfile
            const result = await signup_(userName, password, confirmPassword, email, type)
            console.log(result)
            if (result.status !== 200) {
                reject({
                    status: '400',
                    message: 'Username or password is incorrect'
                });
            } else {
                resolve(result);
            }
        })
    }

    send = (event) => {
        event.preventDefault();
        const newProfile = {
            role: this.state.role,
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            confirmPassword: this.state.confirmPassword
        }
        
        if (!validateEmail(this.state.email)) {
            let error = this.state.error;
            error.email = "Not a valid email";
            return this.setState({
                error: error
            });
        }
        
        // https://stackoverflow.com/a/21456918
        const passwordReqCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordReqCheck.test(this.state.password)) {
            let error = this.state.error;
            error.password = "Password does not meet criteria:\n" +
            "8 char minimum,\n" +
            "at least one uppercase,\n" +
            "one lowercase letter,\n" +
            "one number and one special character.";
            return this.setState({
                error: error
            });
        }
        if (this.state.password !== this.state.confirmPassword) {
            let error = this.state.error;
            error.confirm = "Passwords do not match";
            return this.setState({
                error: error
            });
        }
        

        // sends POST to API with new signup details
        // recieves http status and profile

        let error;
        this.callSignupAPI(newProfile)
            .then((result) => {
                const user = result.data.user
                let redirect = {
                    pathname: "/profile/" + user.userName,
                }
                ReactSession.set("username", user.userName);
                ReactSession.set("userId", user._id)
                console.log("redirect", redirect)
                this.setState({
                    redirect: redirect
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    error: {
                        username: error.message
                    }
                });
            });
    }
    printType = (event) => {
        console.log(event.target.value)
    }
    render() {

        return (
            <div className="signup-container">
                <h1>Sign-up</h1>
                <img className="logo-img" src={process.env.PUBLIC_URL + "/images/6ixfix_logo_black.png"}/>
                <form className="signup-form">
                    <div className = "radio-button-container" onChange={this.handleInput}>
                        <input type = 'radio' value = 'Client' name = 'type' defaultChecked='checked'/>
                        <label for = 'type'>Client</label>
                        <input type = 'radio' value = 'Mechanic' name = 'type'/> 
                        <label for = 'type'>Mechanic</label>
                    </div>
                    <div className="inputName"><p>Email:</p><p>*</p></div>
                    <input
                        type = "text"
                        name = "email"
                        value = {this.state.email}
                        onChange = {this.handleInput}
                        placeholder = "email@example.com"/>
                    {
                        this.state.error.email ? <p className="error">Error: {this.state.error.email}</p> : null
                    }
                    <div className="inputName"><p>Username:</p><p>*</p></div>
                    <input
                        type = "text"
                        name = "userName"
                        value = {this.state.userName}
                        onChange = {this.handleInput}
                        placeholder = "jdoe123"/>
                    {
                        this.state.error.username ? <p className="error">Error: {this.state.error.username}</p> : null
                    }
                    <div className="inputName"><p>Password:</p><p>*</p></div>
                    <input
                        type = "password"
                        name = "password"
                        value = {this.state.password}
                        onChange = {this.handleInput}
                        placeholder = "password"/>
                    {
                        this.state.error.password ? <p className="error">Error: {this.state.error.password}</p> : null
                    }
                    <div className="inputName"><p>Confirm Password:</p><p>*</p></div>
                    <input
                        type = "password"
                        name = "confirmPassword"
                        value = {this.state.confirmPassword}
                        onChange = {this.handleInput}
                        placeholder = "confirm password"/>
                    {
                        this.state.error.confirm ? <p className="error">Error: {this.state.error.confirm}</p> : null
                    }
                    <button type="submit" className="submit" onClick={this.send}>Signup</button>
                </form>
                { this.state.redirect ? (<Redirect push to={this.state.redirect}/>) : null }
                <Link to="/login" className="signup-prompt">Already have an account? Login</Link>
            </div>
        )
    }
}