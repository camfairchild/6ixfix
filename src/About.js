import React from 'react';
import Header from './Header';
import './about.css';

import { Link } from 'react-router-dom';
import { fromPairs } from 'lodash';


export default class About extends React.Component {
    

    render() {
        return(
            <div className='About'>
                <Header page="profile"/>

                <div className='faq'>
                    <h2>FAQ</h2>
                    
                    <h4>What is 6ixfix?</h4>
                    <div className='faqtext'>
                        <p>6ixfix is a new community for mechanics and car owners to find each other. Designed for finding mechanics who know your car, 6ixfix is the fastest growing auto social network in Toronto.</p>
                    </div>
                    <h4>How do I use 6ixfix as a car owner?</h4>
                    <div className='faqtext'>
                        <p>After signing up as a user, you can browse mechanics in the GTA and find one that has what you're looking for in a mechanic. Then you can message them with our built-in messaging system to get in touch!</p>
                    </div>
                    <h4>How do I use 6ixfix as a mechanic?</h4>
                    <div className='faqtext'>
                        <p>As a mechanic, you can make posts highlighting your skills to showcase your business to car owners on 6ixfix. Make sure to check your messages for car owners looking for help!</p>
                    </div>
                </div>
            </div>
        )
    }
}
