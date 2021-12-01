import React from 'react';
import Home from './Home';
import Search from './Search';
import About from './About';
import Help from './Help';
import dotenv from 'dotenv';

// https://reactrouter.com/web/guides/quick-start
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './Profile';
import MakePost from './MakePost';
import Messaging from './messaging/Messaging';
import { Dashboard } from './Dashboard/Dashboard';
import { ReactSession } from 'react-client-session';
export default class App extends React.Component {
    render() {
        ReactSession.setStoreType("localStorage");
        //dotenv.config()
        console.log(`Running in env: ${process.env.REACT_APP_ENV}`)
        return (
            <Router>
                <Switch>    
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/search' component={Search}/>
                    <Route exact path='/help' component={Help} />
                    <Route exact path='/about' component={About} />
                    {/* <Route path='/admin/:view' component={Admin}/> */}
                    <Route path='/profile/:userName?' component={Profile}/>
                    <Route exact path='/post' component={MakePost}/>
                    <Route exact path='/signup'>
                        <Home page='signup'/>
                    </Route>
                    <Route exact path='/login'>
                        <Home page='login'/>
                    </Route>
                    <Route exact path='/messages' component={Messaging} />
                    {/* <Route>
                        <Home />
                    </Route> */}
                    <Route path="/admin" exact component={Dashboard}/>
                </Switch>
            </Router>
        )
    }
}