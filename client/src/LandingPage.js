import React from 'react';
import './LandingPage.css';
import Header from './Header';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-wrapper">
        <Header />
        <div className="wrapper">
          <div className="main-container">
            <div className="main-content">
              <div className="main-text">
                The ultimate
              </div>
              <div className="main-text">
                car repair platform
              </div>
              <div className="main-text">
                in Canada
              </div>
              <div className="secondary-content">
                <div className="secondary-text">
                  6ixFix is the revolutionary car repair service
                </div>
                <div className="secondary-text">
                  designed with the 21st century in mind.
                </div>
              </div>

            </div>
            <img id="landing-page" href="/" src="images/Oil Change Vector.jpg" />
            
          </div>
          <div className="secondary-container">
              <div className="element">
                <img id="pic" href="/" src="/images/message_icon.jpg" />
                <div className="tertiary-text">
                  Message mechanics
                </div>
                <div className="tertiary-text">
                  through the message client
                </div>
              </div>
              <div className="element">
                <img id="pic" href="/" src="images/mag_glass.jpg" />
                <div className="tertiary-text">
                  Filter results
                </div>
                <div className="tertiary-text">
                  to suit you
                </div>
              </div>
              <div className="element">
                <img id="pic" href="/" src="images/pencil.png" />
                <div className="tertiary-text">
                  Create a unique
                </div>
                <div className="tertiary-text">
                  profile to stand apart
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;
