import React from 'react';
import Home from './Home';
import Search from './Search';
import About from './About';
import Help from './Help';

// https://reactrouter.com/web/guides/quick-start
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Profile from './profile/Profile';
import Messaging from './messaging/Messaging';
import LandingPage from './LandingPage';
import { Dashboard } from './Dashboard/Dashboard';
export default class App extends React.Component {
    render() {
        console.log(`Running in env: ${process.env.REACT_APP_ENV}`)
        return (
            <Router>
                <Switch>    
                    <Route exact path='/search' component={Search}/>
                    <Route exact path='/help' component={Help} />
                    <Route exact path='/about' component={About} />
                    <Route path='/profile/:userName?' component={Profile}/>
                    
                    <Route exact path='/signup'>
                        <Home page='signup'/>
                    </Route>
                    <Route exact path='/login'>
                        <Home page='login'/>
                    </Route>
                    <Route exact path='/logout'>
                        <Home page='login'/>
                    </Route>
                    <Route path='/messages/:userName?' component={Messaging} />
                    {/* Optional argument here*/}
                    <Route path="/admin/:view?" component={Dashboard}/>
                    <Route exact path='/' component={LandingPage}/>
                    <Redirect exact from='/' to='/' />
                </Switch>
            </Router>
        )
    }
}