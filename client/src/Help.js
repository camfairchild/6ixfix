import React from 'react';
import Header from './Header';
import './help.css';

import { Link } from 'react-router-dom';
import { sendHelpForm } from './Helper';
// this will do backend work to send an email to the devs
   



export default class Help extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            uName: '',
            email: '',
            message: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
    }
    
    handleInput(event) {
        event.preventDefault()
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        })
    }


    sendEmail(event) {
        event.preventDefault();
        const result = sendHelpForm(this.state)
        if (!result) {
            alert("message not sent")
        } else {
            alert("message sent")
        }
    }

    render(props) {
        return (
            <div className='Help'>
                <Header page="profile" />

                <div className="contact">
                    <h2>Contact Us</h2>
                    <h4>Need help with something on 6ixfix? Shoot us a message with your info below and we'll get back to you ASAP!</h4>
                    <form>
                        <div className="contactForm">
                            <label className="formField">Name:<span id='red'>*</span> <br/><input type='text' name='uName' value={this.state.uName} onChange={this.handleInput}></input></label>
                        </div>
                        <div className="contactForm">
                            <label className="formField">Email:<span id='red'>*</span> <br/><input type='text' name='email' value={this.state.email} onChange={this.handleInput}></input></label>
                        </div>
                        <div className="contactForm">
                            <label className="formField">Message:<span id='red'>*</span> <br/><textarea rows='4' name='message' value={this.state.message} onChange={this.handleInput}></textarea></label>
                        </div>
                    </form>
                    <div className="submitbutton">
                        <input type='submit' value='Submit' onClick={this.sendEmail}></input>
                    </div>
                </div>
            </div>
        )
    }
}
