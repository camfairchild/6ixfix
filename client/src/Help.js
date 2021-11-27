import React from 'react';
import Header from './Header';
import './help.css';

import { Link } from 'react-router-dom';

// this will do backend work to send an email to the devs
function sendEmail(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    console.log("sending email!")
    return 200;
}   

export default class Help extends React.Component {

    render(props) {
        return (
            <div className='Help'>
                <Header page="profile" />

                <div className="contact">
                    <h2>Contact Us</h2>
                    <h4>Need help with something on 6ixfix? Shoot us a message with your info below and we'll get back to you ASAP!</h4>
                    <form>
                        <div className="contactForm">
                            <label className="formField">Name:<span id='red'>*</span> <br/><input type='text' name='name'></input></label>
                        </div>
                        <div className="contactForm">
                            <label className="formField">Email:<span id='red'>*</span> <br/><input type='text' name='name'></input></label>
                        </div>
                        <div className="contactForm">
                            <label className="formField">Message:<span id='red'>*</span> <br/><textarea rows='4'></textarea></label>
                        </div>
                    </form>
                    <div className="submitbutton">
                        <input type='submit' value='Submit' onClick={sendEmail}></input>
                    </div>
                </div>
            </div>
        )
    }
}
