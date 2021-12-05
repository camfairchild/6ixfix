import React, { useState } from 'react';
import './signup.css';

import { Redirect } from 'react-router';
import { validate as validateEmail } from 'email-validator';
import { Link } from 'react-router-dom';

import { signup_ } from './Helper';
import { useSessionStorage } from './useSessionStorage';

export default function Signup(props) {
    const [user, setUser] = useSessionStorage('user', null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUsername] = useState('');
    const [error, setError] = useState({
        email: '',
        password: '',
        confirm: '',
        username: ''
    });
    const [redirect, setRedirect] = useState(false);
    const [type, setRole] = useState('client');

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else if (name === 'userName') {
            setUsername(value);
        } else if (name === 'type') {
            setRole(value);
        }
        setError({ ...error, [name]: value });
        setError({ ...error, 'username': '' });
    }

    const callSignupAPI = (newProfile) => {
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

    const send = (event) => {
        event.preventDefault();
        const newProfile = {
            role: type,
            userName,
            password,
            email,
            confirmPassword
        }
        
        if (!validateEmail(email)) {
            error.email = "Not a valid email";
            setError(error);
        }
        
        // https://stackoverflow.com/a/21456918
        const passwordReqCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordReqCheck.test(password)) {
            error.password = "Password does not meet criteria:\n" +
            "8 char minimum,\n" +
            "at least one uppercase,\n" +
            "one lowercase letter,\n" +
            "one number and one special character.";
            return setError(error);
        }
        if (password !== confirmPassword) {
            error.confirm = "Passwords do not match";
            return setError(error);
        }
        

        // sends POST to API with new signup details
        // recieves http status and profile

        callSignupAPI(newProfile)
            .then((result) => {
                const user = result.data.profile
                let redirect = {
                    pathname: "/profile/" + user.userName,
                }
                console.log("redirect", redirect)
                setUser({
                    userName: user.userName,
                    user_id: result.data.user_id
                })
                setRedirect(redirect);
            })
            .catch((error) => {
                console.log(error);
                setError({
                    username: error.message,
                })
            });
    }

    return (
        <div className="signup-container">
            <h1>Sign-up</h1>
            <img className="logo-img" src={process.env.PUBLIC_URL + "/images/6ixfix_logo_black.png"}/>
            <form className="signup-form">
                <div className = "radio-button-container" onChange={handleInput}>
                    <input type = 'radio' value = 'Client' name = 'type' defaultChecked='checked'/>
                    <label for = 'type'>Client</label>
                    <input type = 'radio' value = 'Mechanic' name = 'type'/> 
                    <label for = 'type'>Mechanic</label>
                </div>
                <div className="inputName"><p>Email:</p><p>*</p></div>
                <input
                    type = "text"
                    name = "email"
                    value = {email}
                    onChange = {handleInput}
                    placeholder = "email@example.com"/>
                {
                    error.email ? <p className="error">Error: {error.email}</p> : null
                }
                <div className="inputName"><p>Username:</p><p>*</p></div>
                <input
                    type = "text"
                    name = "userName"
                    value = {userName}
                    onChange = {handleInput}
                    placeholder = "jdoe123"/>
                {
                    error.username ? <p className="error">Error: {error.username}</p> : null
                }
                <div className="inputName"><p>Password:</p><p>*</p></div>
                <input
                    type = "password"
                    name = "password"
                    value = {password}
                    onChange = {handleInput}
                    placeholder = "password"/>
                {
                    error.password ? <p className="error">Error: {error.password}</p> : null
                }
                <div className="inputName"><p>Confirm Password:</p><p>*</p></div>
                <input
                    type = "password"
                    name = "confirmPassword"
                    value = {confirmPassword}
                    onChange = {handleInput}
                    placeholder = "confirm password"/>
                {
                    error.confirm ? <p className="error">Error: {error.confirm}</p> : null
                }
                <button type="submit" className="submit" onClick={send}>Signup</button>
            </form>
            { redirect ? (<Redirect push to={redirect}/>) : null }
            <Link to="/login" className="signup-prompt">Already have an account? Login</Link>
        </div>
    )
    
}